const Project = App.Domain.Project;
const BacklogItem = App.Domain.BacklogItem;
const Task = App.Domain.Task;

/**
 * Facade for Home page / Dashboard
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

	/**
	 * Get model with data for dashboard
	 * @param projectId
	 * @returns {Promise<{totalProjects: *, totalBacklogItems: *, totalTasks: *, waitingTasks: *, doneTasks: *}>}
	 */
	async getChartsData(projectId) {
		/*
		 * All the queries should be in services.
		 * This facade should just build model.
		 * For simplification of this demo it's here.
		 * It will be refactored if demo grows.
		 */

		let backlogItems = await BacklogItem.getAll()
			.where(b => b.projectId === $, projectId)
			.map(b => b.id)
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

			waitingTasks: await Task.getAll()
				.where(t => t.done === false && t.backlogItemId in $, backlogItems)
				// .where(t => t.done === false && t.backlogItem.projectId === $, projectId) // Will be possible in later UniMapperJS update
				.count()
				.exec(),

			doneTasks: await Task.getAll()
				.where(t => t.done === true)
				.count()
				.exec()
		}
	}
}

module.exports.HomeFacade = HomeFacade;