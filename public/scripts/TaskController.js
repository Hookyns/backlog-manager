if (typeof TaskController === "undefined") {
	var TaskController = class TaskController {

		constructor(viewData) {
			this.viewData = viewData

			$(() => {
				this.$tasks = $("#tasks");
				this.initList();
			});
		}

		/**
		 * Initialize DataTable
		 */
		initList() {
			// Already initiated; loaded from history.state; need's to be redownloaded, plugin not work without it's state
			if (this.$tasks.attr("role") === "grid") {
				appCtrl.loadPage(appCtrl.url("/Task"), false);
				return;
			}

			this.$tasks.DataTable({
				processing: true,
				serverSide: true,
				ordering: false,
				ajax: "/Backlog/detail/" + this.viewData.backlogId + "/Task/list",
				select: true,
				columnDefs: [
					{
						targets: [0],
						visible: false
					}
				],
				columns: [
					{data: "0"},
					{data: "1"},
					{data: "2"},
					{
						data: null,
						defaultContent: `<a href='#' class='detail'>Detail</a>`,
						orderable: false
					},
				]
			});

			this.registerDetailButtons();
		}

		/**
		 * Helper pro získání dat řádku
		 * @param $row
		 * @returns {*}
		 */
		getRowData($row) {
			let $tr = $row.closest("tr");
			let i = $tr.parent().children().index($tr);
			return this.$tasks.DataTable().data()[i];
		}

		/**
		 * Zaregistruje akce nad tlačítky v gridu
		 */
		registerDetailButtons() {
			// Detail
			this.$tasks.on("click", "a.detail", (e) => {
				e.preventDefault();
				let data = this.getRowData($(e.currentTarget));
				appCtrl.loadPage(appCtrl.url("/Task/detail/" + data[0]));
			});

			// Výběr
			this.$tasks.on("click", "a.pick", (e) => {
				e.preventDefault();
				let data = this.getRowData($(e.currentTarget));
				appCtrl.loadPage(appCtrl.url("/Task/pick/" + data[0]));
			});
		}
	}
}