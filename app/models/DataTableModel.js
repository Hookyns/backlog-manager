/**
 * @memberOf App.Models
 */
class DataTableModel {

	/**
	 * @param data
	 * @param totalCount
	 * @param draw
	 */
	constructor(data, totalCount, draw) {
		this.obj = {
			draw: draw,
			recordsTotal: totalCount,
			recordsFiltered: totalCount,
			data: data
		};
	}

	/**
	 * Return DataTable object
	 * @returns {{draw: number, recordsTotal: *, recordsFiltered: *, data: *}|*}
	 */
	toObject() {
		return this.obj;
	}
}

exports.DataTableModel = DataTableModel;