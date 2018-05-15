const {Jumplate} = require("jumbo-template");
const LocaleProperty = App.Domain.LocaleProperty;
const $umjs = require("unimapperjs");

const LOCALIZATIONS = {};

// Load localized properties
(async function() {
	$umjs.initEntitiesFrom(__dirname + "/../../app/domain");
	await $umjs.immediate();

	let locProperties = await LocaleProperty.getAll()
		.select(lp => ({
			locale: lp.locale,
			locKey: lp.locKey,
			value: lp.value
		}))
		.exec();

	for (let prop of locProperties) {
		let locale = LOCALIZATIONS[prop.locale] || (LOCALIZATIONS[prop.locale] = {});
		locale[prop.locKey] = prop.value;
	}
})();

Jumplate.registerLocalizator(function (key, locale) {
	let loc = LOCALIZATIONS[locale] || {};
	return loc[key] || ("{{" + key + "}}");
});

Jumplate.registerHelper("clientController", function(data) {
	return `<script src="/public/scripts/${this.request.controller}Controller.js"></script>`
		+ `<script>new ${this.request.controller}Controller(${JSON.stringify(data)});</script>`;
});