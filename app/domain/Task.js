const type = require("unimapperjs").type;
const {Entity} = require("unimapperjs/src/Entity");
const domain = require("../../config").domains.default;

/**
 * @class Task
 * @memberOf App.Domain
 */
class Task extends Entity {

	constructor(...args) {
		super(...args);

		/**
		 * Task Id
		 * @type {number}
		 */
		this.id;

		/**
		 * Backlog item id
		 * @type {number}
		 */
		this.backlogItemId;

		/**
		 * Name of Task
		 * @type {string}
		 */
		this.name;

		/**
		 * Task description
		 * @type {string}
		 */
		this.description;

		/**
		 * Byl úkol dokončen?
		 * @type {boolean}
		 */
		this.done;

		/**
		 * Create date-time
		 * @type {Date}
		 */
		this.createdOn;

		/**
		 * Is Task deleted?
		 * @type {boolean}
		 */
		this.isDeleted;

		/**
		 * Backlog item
		 * @type {BacklogItem}
		 */
		this.backlogItem;
	}

	/**
	 * @param {Task} map
	 */
	static map(map) {
		const {BacklogItem} = require("./BacklogItem");

		map.id = type.number.autoIncrement().primary();
		map.name = type.string.length(150);
		map.done = type.boolean;
		map.description = type.string.nullable().length(0);
		map.createdOn = type.date.now();
		map.isDeleted = type.boolean.default(false);
		map.backlogItemId = type.number;
		map.backlogItem = type.foreign(BacklogItem.name)
			.withForeign(task => task.backlogItemId);
	}
}

exports.Task = Task;
domain.entity()(Task);