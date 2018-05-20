if (typeof BacklogController === "undefined") {
	var BacklogController = class BacklogController {

		constructor() {
			$(() => {
				this.$backlogItems = $("#backlog-items");
				this.initList();
			});
		}

		/**
		 * Initialize DataTable
		 */
		initList() {
			// Already initiated; loaded from history.state; need's to be redownloaded, plugin not work without it's state
			if (this.$backlogItems.attr("role") === "grid") {
				appCtrl.loadPage(appCtrl.url("/Backlog"), false);
				return;
			}

			this.$backlogItems.DataTable({
				processing: true,
				serverSide: true,
				ordering: false,
				ajax: "/Backlog/list",
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
						defaultContent: "<a href='#' class='detail'><i class='fas fa-eye'></i></a>",
						orderable: false
					},
				]
			});

			this.registerDetailButtons();
		}

		registerDetailButtons() {
			this.$backlogItems.on("click", "a.detail", (e) => {
				e.preventDefault();

				let $tr = $(e.currentTarget).closest("tr");
				let i = $tr.parent().children().index($tr);
				let data = this.$backlogItems.DataTable().data()[i];

				appCtrl.loadPage(appCtrl.url("/Backlog/detail/" + data[0]));
			});
		}
	}
}