const DataTableModel = App.Models.DataTableModel;
const BacklogItem = App.Domain.BacklogItem;

/**
 * @class BacklogService
 * @memberOf App.Services
 */
class BacklogService {

	/**
	 * Ctor
	 */
	constructor() {

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

		console.log(BacklogItem.domain.__adapter.executedQueries);

		return new DataTableModel(
			backlogItems,
			total,
			params.draw
		);
	}
}

module.exports = BacklogService;