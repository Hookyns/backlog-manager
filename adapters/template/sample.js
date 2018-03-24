const SampleAdapter = {

	render: async function render(templatePath, layoutPath, dynamicLayout, data, context) {
		// ...
	},

	preCompile: async function preCompile(templatePath, layoutPath, dynamicLayout) {
		// ...
	},

	renderPreCompiled: async function renderPreCompiled(compiledTemplate, data, context) {
		// ...
	},

	/**
	 * Extension of template files
	 */
	extension: ".tpl",

	/**
	 * Set TUE if you implement preCompile and renderPreCompiled methods
	 */
	preCompilation: true
};

module.exports = SampleAdapter;