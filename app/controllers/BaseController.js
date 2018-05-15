const {Controller} = require("jumbo-core/Base/Controller");
const {Log} = require("jumbo-core/Logging/Log");
const Project = App.Domain.Project;

/**
 * This is your BaseController which you can edit
 * @memberOf App.Controllers
 */
class BaseController extends Controller {
	// /**
	//  * Called before each action
	//  */
	// async beforeActions() {
	// }

	// Add your own methods...

	/**
	 * Log error
	 * @param error
	 */
	logError(error) {
		Log.error(`${error.message}\n${error.stack}`);
	}

	/**
	 * Override
	 * @param viewOrData
	 * @param data
	 */
	async view(viewOrData, data) {
		let result = super.view(viewOrData, data);
		result.data = await this.addInfo(result.data);
		return result;
	}

	/**
	 * Add default view info into model
	 * @param model
	 * @returns {{selectedProjectName: any} & any}
	 */
	async addInfo(model) {

		// TODO: Vytvořit beforeRender() metodu, která se bude volat před každou akcí, kde tohle bude mocu programátor řešit.

		let obj = {};

		if (this.session.selectedProjectId) {
			let project = await Project.getById(this.session.selectedProjectId, "name");

			if (project) {
				obj.selectedProjectName = project.name;
			}
		}

		// let session = this.session || (this.session = {});

		return Object.assign(obj, model);
	}
}

module.exports = BaseController;