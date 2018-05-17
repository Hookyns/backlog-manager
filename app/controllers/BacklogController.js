const BacklogItem = App.Domain.BacklogItem;

/**
 * TODO: Describe your controller
 * @class BacklogController
 * @memberOf App.Controllers
 */
class BacklogController extends App.Controllers.BaseController {

	constructor(IBacklogService) {
		super();
		this.backlogService = IBacklogService;
	}

	/**
	 * Default view action
	 */
	async actionIndex() {
		return this.view({});
	}

	/**
	 * GET Backlog items pro DataTables
	 * @returns {Promise<void>}
	 */
	async getList() {
		let model = await this.backlogService.getBacklogItemsDataTable(
			this.request.params, this.session.selectedProjectId);

		return this.json(
			model.toObject()
		);
	}

	/**
	 * GET backlog item insert
	 * @returns {Promise<ViewResult>}
	 */
	async getInsert() {
		return this.view({
			backlogItem: {}
		});
	}

	/**
	 * POST backlog item insert
	 * @returns {Promise<ViewResult>}
	 */
	async postInsert() {
		try {
			let backlogItem = new BacklogItem(this.request.body.fields);
			backlogItem.projectId = this.session.selectedProjectId;
			await BacklogItem.insert(backlogItem);

			return this.redirect(
				this.url.action("detail")
					.params({id: backlogItem.id})
			);
		} catch (e) {
			this.logError(e);
			return this.getInsert();
		}
	}

	/**
	 * GET backlog item detail
	 * @param id
	 * @returns {Promise<ViewResult>}
	 */
	async getDetail(id) {
		let backlogItem = await BacklogItem.getById(id);

		if (!backlogItem) {
			return this.error("BacklogItem not exists", 404);
		}

		return this.view({
			backlogItem: backlogItem
		});
	}

	/**
	 * POST backlog item detail
	 * @param id
	 * @returns {Promise<ViewResult>}
	 */
	async postDetail(id) {
		let backlogItem = await BacklogItem.getById(id);

		if (!backlogItem) {
			return this.error("BacklogItem not exists", 404);
		}

		try {
			backlogItem.mapFrom(this.request.body.fields);
			await backlogItem.save();

			return this.redirect(
				this.url.action("detail")
					.params({id: id})
			);
		} catch (e) {
			this.logError(e);
			return this.getDetail(id);
		}
	}

	/**
	 * DELETE backlog item
	 * @param id
	 * @returns {Promise<*>}
	 */
	async actionDelete(id) {
		let backlogItem = await BacklogItem.getById(id);

		if (!backlogItem) {
			return this.error("BacklogItem not exists", 404);
		}

		try {
			backlogItem.isDeleted = true;
			await backlogItem.save();
		} catch (error) {
			this.logError(error);
		}

		return this.redirect(
			this.url.action("index")
		);
	}
}

module.exports = BacklogController;