const DataTableModel = App.Models.DataTableModel;
const Project = App.Domain.Project;

/**
 * @memberOf App.Services
 */
class ProjectService {

	/**
	 * Vrátí DataTableModel
	 * @param params
	 * @returns {DataTableModel}
	 */
	async getProjectsDataTable(params) {
		let searchValue = params["search[value]"];

		let baseQuery = Project.getAll()
			.where(proj => proj.isDeleted === false)
			.whereIf(proj => proj.name.startsWith($)
				|| proj.description.includes($), !!searchValue, searchValue, searchValue);

		let total = await baseQuery
			.count()
			.exec();

		let projects = await baseQuery
			.slice(params.start, params.start + params.length)
			.map(proj => [
				proj.id,
				proj.name,
				proj.description.slice(0, 100) + (proj.description.length >= 100 ? "..." : "")
			])
			.exec();

		return new DataTableModel(
			projects,
			total,
			params.draw
		);
	}
}

module.exports.ProjectService = ProjectService;