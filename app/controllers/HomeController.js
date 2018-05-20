const BaseController = require("./BaseController");

/**
 * Default controller
 * @class HomeController
 */
class HomeController extends BaseController {

	constructor(IHomeFacade) {
		super();

		/**
		 * @type {HomeFacade}
		 */
		this.homeFacade = IHomeFacade;
	}

	//noinspection JSUnusedGlobalSymbols
	/**
	 * Dashboard
	 * @description Default homepage with projects and their backlogs overview
	 */
	async actionIndex() {
		return this.view({
			chartsData: await this.homeFacade.getChartsData(this.session.selectedProjectId)
		});
	}
}

module.exports = HomeController;