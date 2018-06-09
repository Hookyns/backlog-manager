const {Controller} = require("jumbo-core/base/Controller");
const {Log} = require("jumbo-core/logging/Log");
const Project = App.Domain.Project;

/**
 * This is your BaseController which you can edit
 * @memberOf App.Controllers
 */
class BaseController extends Controller {
	/**
	 * Called before each action
	 */
	async beforeActions() {
		this.extendViewModel(await this.projectViewInfo());
	}

	// Add your own methods...

	/**
	 * Log error
	 * @param error
	 */
	logError(error) {
		Log.error(`${error.message}\n${error.stack}`);
	}

	/**
	 * Add default view info into model
	 * @param model
	 * @returns {{selectedProjectName: any} & any}
	 */
	async projectViewInfo() {

		// TODO: Create beforeRender() in jumbo-core

		let obj = {};

		if (this.session.selectedProjectId) {
			let project = await Project.getById(this.session.selectedProjectId, "name");

			if (project) {
				obj.selectedProjectName = project.name;
			}
		}

		return obj;
	}
}

module.exports = BaseController;