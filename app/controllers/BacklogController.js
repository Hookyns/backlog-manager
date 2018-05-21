const BacklogItem = App.Domain.BacklogItem;

/**
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
		return (await this.backlogService.getBacklogItemsDataTable(
			this.request.params, this.session.selectedProjectId)).toObject();
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
		let backlogItem = await this.backlogService.insert(this.session.selectedProjectId, this.request.body.fields);

		this.redirect(
			this.url.action("detail")
				.params({id: backlogItem.id})
		);
	}

	/**
	 * GET backlog item detail
	 * @param id
	 * @returns {Promise<ViewResult>}
	 */
	async getDetail(id) {
		let backlogItem = await BacklogItem.getByIdOrThrow(id);

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
		await this.backlogService.update(id, this.request.body.fields);

		this.redirect(
			this.url.action("detail")
				.params({id: id})
		);
	}

	/**
	 * DELETE backlog item
	 * @param id
	 * @returns {Promise<*>}
	 */
	async actionDelete(id) {
		let backlogItem = await BacklogItem.getByIdOrThrow(id);
		backlogItem.isDeleted = true;
		await backlogItem.save();

		this.redirect(
			this.url.action("index")
		);
	}
}

module.exports = BacklogController;