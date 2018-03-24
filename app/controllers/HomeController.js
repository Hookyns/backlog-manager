const BaseController = require("./BaseController");

/**
 * Default controller
 * @class HomeController
 */
class HomeController extends BaseController {

	//noinspection JSUnusedGlobalSymbols
	/**
	 * Dashboard
	 * @description Default homepage with projects and their backlogs overview
	 */
	async actionIndex() {
		return this.view({
			homepage: true
		});
	}
}

module.exports = HomeController;