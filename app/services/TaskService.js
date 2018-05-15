const DataTableModel = App.Models.DataTableModel;
const Task = App.Domain.Task;

/**
 * @class TaskService
 * @memberOf App.Services
 */
class TaskService {

	/**
	 * Ctor
	 */
	constructor() {

	}

	/**
	 * Insert new Task
	 * @param backlogId
	 * @param fields
	 * @returns {Promise<App.Domain.Task>}
	 */
	async insert(backlogId, fields) {
		let task = new Task(fields);

		task.backlogItemId = backlogId;
		task.done = !!fields.done;

		await Task.insert(task);

		return task;
	}

	/**
	 * Vrátí DataTableModel
	 * @param params
	 * @returns {DataTableModel}
	 */
	async getTasksDataTable(params) {
		let searchValue = params["search[value]"];

		let baseQuery = Task.getAll()
			.where(task => task.isDeleted === false && task.backlogItemId === $, params.backlogId)
			.whereIf(task => task.name.startsWith($)
				|| task.description.includes($), !!searchValue, searchValue, searchValue);

		let total = await baseQuery
			.count()
			.exec();

		let tasks = await baseQuery
			.slice(params.start, params.start + params.length)
			.map(task => [
				task.id,
				task.name,
				task.description.slice(0, 100) + (task.description.length >= 100 ? "..." : "")
			])
			.exec();

		return new DataTableModel(
			tasks,
			total,
			params.draw
		);
	}
}

module.exports = TaskService;