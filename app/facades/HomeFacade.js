const Project = App.Domain.Project;
const BacklogItem = App.Domain.BacklogItem;
const Task = App.Domain.Task;

/**
 * @class HomeFacade
 * @memberOf App.Facades
 */
class HomeFacade {

	// /**
	//  * Ctor
	//  */
	// constructor(IProjectService, IBacklogService, ITaskService) {
	// 	this.projectService = IProjectService;
	// 	this.backlogService = IBacklogService;
	// 	this.taskService = ITaskService;
	// }

	async getChartsData(projectId) {
		let backlogItems = await BacklogItem.getAll()
			.where(b => b.projectId === $, projectId)
			.map(b => b.id)
			.exec();

		let waitingTasksCount = await Task.getAll()
			.where(t => t.done === false && t.backlogItemId in $, backlogItems)
			.count()
			.exec();

		let doneTasksCount = await Task.getAll()
			.where(t => t.done === true)
			.count()
			.exec();

		return {
			totalProjects: await Project.getAll()
				.where(p =>  p.isDeleted === false)
				.count()
				.exec(),

			totalBacklogItems: await BacklogItem.getAll()
				.where(p =>  p.isDeleted === false)
				.count()
				.exec(),

			totalTasks: await Task.getAll()
				.where(p =>  p.isDeleted === false)
				.count()
				.exec(),

			projectTasks: {
				labels: ["Waitig", "Done"],
				datasets: [{
					label: 'Tasks progress',
					data: [waitingTasksCount, doneTasksCount],
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)'
					],
					borderColor: [
						'rgba(255,99,132,1)',
						'rgba(54, 162, 235, 1)'
					],
					borderWidth: 1
				}]
			}
		}
	}
}

module.exports.HomeFacade = HomeFacade;