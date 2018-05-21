const Project = App.Domain.Project;

/**
 * Controller pracující s Projekty
 * @class ProjectController
 * @memberOf App.Controllers
 */
class ProjectController extends App.Controllers.BaseController {


	constructor(IProjectService) {
		super();

		/**
		 * @type {ProjectService}
		 */
		this.projectService = IProjectService;
	}

	/**
	 * Default view action
	 */
	async actionIndex() {
		return this.view({});
	}

	/**
	 * GET Projects pro DataTables
	 * @returns {Promise<void>}
	 */
	async getList() {
		return (await this.projectService.getProjectsDataTable(this.request.params))
			.toObject();
	}

	/**
	 * Pick project as context
	 * @param id
	 * @returns {Promise<void>}
	 */
	async actionPick(id) {
		let project = await Project.getByIdOrThrow(id);
		this.session.selectedProjectId = project.id;

		this.redirect(
			this.url.action("index", "Backlog")
		);
	}

	/**
	 * GET project insert
	 */
	async getInsert() {
		return this.view({
			project: {}
		});
	}

	/**
	 * POST project insert
	 * @returns {Promise<*>}
	 */
	async postInsert() {
		let project = new Project(this.request.body.fields);
		await Project.insert(project);

		this.redirect(
			this.url.action("detail")
				.params({id: project.id})
		);
	}

	/**
	 * GET Project detail
	 */
	async getDetail(id) {
		let project = await Project.getByIdOrThrow(id);

		return this.view({
			project: project
		});
	}

	/**
	 * POST Project detail
	 */
	async postDetail(id) {
		let project = await Project.getByIdOrThrow(id);

		project.mapFrom(this.request.body.fields);
		await project.save();

		return this.redirect(
			this.url.action("detail")
				.params({id: id})
		);
	}

	/**
	 * DELETE Project
	 * @param id
	 * @returns {Promise<void>}
	 */
	async actionDelete(id) {
		let project = await Project.getByIdOrThrow(id);

		project.isDeleted = true;
		await project.save();

		if (this.session.selectedProjectId == id) {
			this.session.selectedProjectId = undefined;
		}

		this.redirect(
			this.url.action("index")
		);
	}
}

module.exports = ProjectController;