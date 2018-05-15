const type = require("unimapperjs").type;
const {Entity} = require("unimapperjs/src/Entity");
const domain = require("../../config").domains.default;

/**
 * @class BacklogItem
 * @memberOf App.Domain
 */
class BacklogItem extends Entity {

	constructor(...args) {
		super(...args);

		/**
		 * BacklogItem Id
		 * @type {number}
		 */
		this.id;

		/**
		 * Name of BacklogItem
		 * @type {string}
		 */
		this.name;

		/**
		 * BacklogItem description
		 * @type {string}
		 */
		this.description;

		/**
		 * Create date-time
		 * @type {Date}
		 */
		this.createdOn;

		/**
		 * Is BacklogItem deleted?
		 * @type {boolean}
		 */
		this.isDeleted;
	}

	/**
	 * @param {BacklogItem} map
	 */
	static map(map) {
		map.id = type.number.autoIncrement().primary();
		map.name = type.string.length(150);
		map.description = type.string.nullable().length(0);
		map.createdOn = type.date.now();
		map.isDeleted = type.boolean.default(false);
	}
}

exports.BacklogItem = BacklogItem;
domain.entity()(BacklogItem);