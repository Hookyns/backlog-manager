const Task = App.Domain.Task;

/**
 * TODO: Describe your controller
 * @class TaskController
 * @memberOf App.Controllers
 */
class TaskController extends App.Controllers.BaseController {

	constructor(ITaskService) {
		super();
		this.taskService = ITaskService;
	}

	/**
	 * Default view action
	 */
	async actionIndex(backlogId) {
		return this.view({
			backlogId: backlogId
		});
	}

	/**
	 * GET Tasks pro DataTables
	 * @returns {Promise<void>}
	 */
	async getList() {
		let model = await this.taskService.getTasksDataTable(this.request.params);

		return this.json(
			model.toObject()
		);
	}

	/**
	 * GET task insert
	 * @returns {Promise<ViewResult>}
	 */
	async getInsert(backlogId) {
		return this.view({
			task: {},
			backlogId: backlogId
		});
	}

	/**
	 * POST task insert
	 * @returns {Promise<ViewResult>}
	 */
	async postInsert(backlogId) {
		try {
			let task = await this.taskService.insert(backlogId, this.request.body.fields);

			return this.redirect(
				this.url.action("detail")
					.params({id: task.id, backlogId: backlogId})
			);
		} catch (e) {
			this.logError(e);
			return this.getInsert(backlogId);
		}
	}

	/**
	 * GET task item detail
	 * @param backlogId
	 * @param id
	 * @returns {Promise<ViewResult>}
	 */
	async getDetail(backlogId, id) {
		let task = await Task.getById(id);

		if (!task) {
			return this.error("Task not exists", 404);
		}

		return this.view({
			task: task,
			backlogId: backlogId
		});
	}

	/**
	 * POST task item detail
	 * @param backlogId
	 * @param id
	 * @returns {Promise<ViewResult>}
	 */
	async postDetail(backlogId, id) {
		let task = await Task.getById(id);

		if (!task) {
			return this.error("Task not exists", 404);
		}

		try {
			let fields = this.request.body.fields;
			task.mapFrom(fields);
			task.done = !!fields.done;
			await task.save();

			return this.redirect(
				this.url.action("detail")
					.params({id: id, backlogId: backlogId})
			);
		} catch (e) {
			this.logError(e);
			return this.getDetail(backlogId, id);
		}
	}

	/**
	 * DELETE task item
	 * @param id
	 * @returns {Promise<*>}
	 */
	async actionDelete(id) {
		let task = await Task.getById(id);

		if (!task) {
			return this.error("Task not exists", 404);
		}

		try {
			task.isDeleted = true;
			await task.save();
		} catch (error) {
			this.logError(error);
		}

		return this.redirect(
			this.url.action("index")
		);
	}
}

module.exports = TaskController;