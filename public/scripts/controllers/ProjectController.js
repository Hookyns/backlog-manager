if (typeof ProjectController === "undefined") {
	var ProjectController = class ProjectController {

		constructor() {
			$(() => {
				this.$projects = $("#projects");
				this.initList();
			});
		}

		/**
		 * Initialize DataTable
		 */
		initList() {
			// Already initiated; loaded from history.state; need's to be redownloaded, plugin not work without it's state
			if (this.$projects.attr("role") === "grid") {
				appCtrl.loadPage(appCtrl.url("/Project"), false);
				return;
			}

			this.$projects.DataTable({
				processing: true,
				serverSide: true,
				ordering: false,
				ajax: "/Project/list",
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
						defaultContent: `<a href='#' class='detail'><i class='fas fa-eye'></i></a> &nbsp; `
							+ `<a href='#' class='pick' title='Vybrat' data-j-prevent><i class="fas fa-paperclip"></i></a>`,
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
			return this.$projects.DataTable().data()[i];
		}

		/**
		 * Zaregistruje akce nad tlačítky v gridu
		 */
		registerDetailButtons() {
			// Detail
			this.$projects.on("click", "a.detail", (e) => {
				e.preventDefault();
				let data = this.getRowData($(e.currentTarget));
				appCtrl.loadPage(appCtrl.url("/Project/detail/" + data[0]));
			});

			// Výběr
			this.$projects.on("click", "a.pick", (e) => {
				e.preventDefault();
				let data = this.getRowData($(e.currentTarget));
				location.href = appCtrl.url("/Project/pick/" + data[0]);
				// appCtrl.loadPage(appCtrl.url("/Project/pick/" + data[0]));
			});
		}
	}
}