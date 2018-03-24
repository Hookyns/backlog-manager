class HomeController extends uJumbo.Controller {
	constructor() {
		super("body"); // Context selector
		console.log("Constructor called");
	}

	onInit() {
		console.log("Init called", arguments);
	}

	onPageLoad(href) {

	}

	onFormSubmit($form) {

	}
}

const home = new HomeController();