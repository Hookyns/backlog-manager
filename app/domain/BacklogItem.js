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
		 * Project Id
		 */
		this.projectId;

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

		/**
		 * Was backlog item done?
		 * @type {boolean}
		 */
		this.done;
	}

	/**
	 * @param {BacklogItem} map
	 */
	static map(map) {
		const {Project} = require("./Project");

		map.id = type.number.autoIncrement().primary();
		map.projectId = type.number;
		map.project = type.foreign(Project.name).withForeign(bi => bi.projectId);
		map.name = type.string.length(150);
		map.description = type.string.nullable().length(0);
		map.createdOn = type.date.now();
		map.done = type.boolean;
		map.isDeleted = type.boolean.default(false);
	}
}

exports.BacklogItem = BacklogItem;
domain.entity()(BacklogItem);