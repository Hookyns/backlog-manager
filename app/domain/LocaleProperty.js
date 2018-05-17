const type = require("unimapperjs").type;
const {Entity} = require("unimapperjs/src/Entity");
const domain = require("../../config").domains.default;

/**
 * @class LocaleProperty
 * @memberOf App.Domain
 */
class LocaleProperty extends Entity {

	constructor(...args) {
		super(...args);

		/**
		 * Locale property Id
		 * @type {number}
		 */
		this.id;

		/**
		 * Locale property key
		 * @type {string}
		 */
		this.locKey;

		/**
		 * Locale
		 * @type {string}
		 */
		this.locale;

		/**
		 * Localized value
		 * @type {string}
		 */
		this.value;
	}

	/**
	 * @param {Project} map
	 */
	static map(map) {
		map.id = type.number.autoIncrement().primary();
		map.locKey = type.string.length(150);
		map.locale = type.string.length(10);
		map.value = type.string;
	}

	/**
	 * Seeding method
	 * @returns {Promise<LocaleProperty[]>}
	 */
	static async seed() {
		// Delete existing values
		await LocaleProperty.removeWhere(e => null);

		// Seed values
		return require("./seeding/locale-property-seed");
	}
}

exports.LocaleProperty = LocaleProperty;
domain.entity()(LocaleProperty);