const DataTableModel = App.Models.DataTableModel;
const BacklogItem = App.Domain.BacklogItem;

/**
 * @class BacklogService
 * @memberOf App.Services
 */
class BacklogService {

	/**
	 * Insert new Backlog Item
	 * @param projectId
	 * @param fields
	 * @returns {Promise<App.Domain.BacklogItem>}
	 */
	async insert(projectId, fields) {
		let bItem = new BacklogItem(fields);

		bItem.projectId = projectId;
		bItem.done = "done" in fields ? !!fields.done : false;

		await BacklogItem.insert(bItem);

		return bItem;
	}

	/**
	 * Update Backlog Item
	 * @param id
	 * @param fields
	 * @returns {Promise<any>}
	 */
	async update(id, fields) {
		let bItem = await BacklogItem.getByIdOrThrow(id);

		bItem.mapFrom(fields);
		bItem.done = "done" in fields ? !!fields.done : false;

		await bItem.save();

		return bItem;
	}

	/**
	 * Vrátí DataTableModel
	 * @param params
	 * @param projectId
	 * @returns {DataTableModel}
	 */
	async getBacklogItemsDataTable(params, projectId) {
		let searchValue = params["search[value]"];

		let baseQuery = BacklogItem.getAll()
			.where(bItem => bItem.isDeleted === false && bItem.projectId === $, projectId)
			.whereIf(bItem => bItem.name.startsWith($)
				|| bItem.description.includes($), !!searchValue, searchValue, searchValue);

		let total = await baseQuery
			.count()
			.exec();

		let backlogItems = await baseQuery
			.slice(params.start, params.start + params.length)
			.map(bItem => [
				bItem.id,
				bItem.name,
				bItem.description.slice(0, 100) + (bItem.description.length >= 100 ? "..." : "")
			])
			.exec();

		return new DataTableModel(
			backlogItems,
			total,
			params.draw
		);
	}
}

module.exports = BacklogService;