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
			homepage: true,
			user: {
				age: 17
			},
			items: {
				0: {
					name: "First"
				},
				10: {
					name: "Second"
				}
			},
			htmlStyledContent: `<header>
					<h1>Section title</h1>
					<article>Lorem ipsum dolor sit amet.</article>
				</header>`
		});
	}
}

module.exports = HomeController;