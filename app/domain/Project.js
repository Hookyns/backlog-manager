const type = require("unimapperjs").type;
const {Entity} = require("unimapperjs/src/Entity");
const domain = require("../../config").domains.default;

class Project extends Entity {

	constructor(...args) {
		super(...args);

		/**
		 * Project Id
		 * @type {number}
		 */
		this.id;

		/**
		 * Name of project
		 * @type {string}
		 */
		this.name;

		/**
		 * Project description
		 * @type {string}
		 */
		this.description;

		/**
		 * Create date-time
		 * @type {Date}
		 */
		this.createdOn;

		/**
		 * Is project deleted?
		 * @type {boolean}
		 */
		this.isDeleted;
	}

	/**
	 * @param {Project} map
	 */
	static map(map) {
		map.id = type.number.autoIncrement().primary();
		map.name = type.string.length(150);
		map.description = type.string.nullable().length(Infinity);
		map.createdOn = type.date.now();
		map.isDeleted = type.boolean.default(false);
	}
}

module.exports.Project = Project;
domain.entity()(Project);