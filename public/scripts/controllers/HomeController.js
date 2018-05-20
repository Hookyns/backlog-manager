if (typeof HomeController === "undefined") {
	var HomeController = class HomeController {

		constructor(graphData) {
			this.graphData = graphData;
			uJumbo.onReady(() => {
				this.createGraph();
			});
		}

		createGraph() {
			let canvas = uJumbo.get("#tasks-pie")[0];
			if (!canvas) return;
			let ctx = canvas.getContext("2d");
			let graph = new Chart(ctx, {
				type: "pie",
				data: {
					labels: ["Waiting", "Done"],
					datasets: [{
						data: [this.graphData.waitingTasks, this.graphData.doneTasks],
						backgroundColor: [
							'#ff5455',
							'#79c447'
						],
						borderColor: [
							'rgba(255,99,132,1)',
							'rgba(54, 162, 235, 1)'
						],
						borderWidth: 1
					}]
				}
			});
		}
	}
}