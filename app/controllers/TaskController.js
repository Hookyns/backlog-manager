const Task = App.Domain.Task;

/**
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
		return (await this.taskService.getTasksDataTable(this.request.params)).toObject();
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
		let task = await this.taskService.insert(backlogId, this.request.body.fields);

		this.redirect(
			this.url.action("detail")
				.location("backlogDetail")
				.params({id: task.id, backlogId: backlogId})
		);
	}

	/**
	 * GET task item detail
	 * @param backlogId
	 * @param id
	 * @returns {Promise<ViewResult>}
	 */
	async getDetail(backlogId, id) {
		let task = await Task.getByIdOrThrow(id);

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
		await this.taskService.update(id, this.request.body.fields);

		this.redirect(
			this.url.action("detail")
				.params({id: id, backlogId: backlogId})
		);
	}

	/**
	 * DELETE task item
	 * @param backlogId
	 * @param id
	 * @returns {Promise<*>}
	 */
	async actionDelete(backlogId, id) {
		let task = await Task.getByIdOrThrow(id);
		task.isDeleted = true;
		await task.save();

		this.redirect(
			this.url.action("index")
				.location("backlogDetail")
				.params({backlogId: backlogId})
		);
	}
}

module.exports = TaskController;