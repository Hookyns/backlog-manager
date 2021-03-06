(function(scope) {
	if (scope.AppController) return;

	var AppController = scope.AppController = class extends uJumbo.Controller {
		constructor() {
			super("body"); // Context selector
		}

		onInit() {
			// console.log("Init called", arguments);
		}

		onBeforeNavigate(headers) {
			// console.log("onBeforeNavigate", arguments)
		}

		onNavigate(error, response) {
			if (error) {
				alert(error.message);
			}

			// console.log("onNavigate", arguments)
		}

		onPopState(state) {
			// console.log("onPopState", arguments)
		}

		onBeforeFormSubmit(data, headers) {
			// console.log("onBeforeFormSubmit", arguments)
		}

		onFormSubmit(error, response) {
			if (error) {
				alert(error.message);
			}

			// console.log("onFormSubmit", arguments)
		}

		url(url) {
			let localeMatch = location.pathname.match(/^\/([a-z]{2}-[a-z]{2})/i);
			let locale = "";

			if (localeMatch) {
				locale = localeMatch[1];
			}

			return "/" + locale + url;
		}
	};

	scope.appCtrl = new AppController();
})(window);
