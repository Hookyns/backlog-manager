class AppController extends uJumbo.Controller {
	constructor() {
		super("body"); // Context selector
		console.log("Constructor called");
	}

	onInit() {
		console.log("Init called", arguments);
	}
	onBeforeNavigate(headers) {
		console.log("onBeforeNavigate", arguments)
	}
	onNavigate(error, response) {
		if (error) {
			alert(error.message);
		}

		console.log("onNavigate", arguments)
	}
	onPopState(state) {
		console.log("onPopState", arguments)
	}
	onBeforeFormSubmit(data, headers) {
		console.log("onBeforeFormSubmit", arguments)
	}
	onFormSubmit(error, response) {
		if (error) {
			alert(error.message);
		}

		console.log("onFormSubmit", arguments)
	}

	url(url) {
		let localeMatch  = location.pathname.match(/^\/([a-z]{2}-[a-z]{2})/i);
		let locale = "";

		if (localeMatch) {
			locale = localeMatch[1];
		}

		return "/" + locale + url;
	}
}

const appCtrl = new AppController();