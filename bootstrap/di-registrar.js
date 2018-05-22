/**
 * Dependency registrar - registration of services
 * @param {DIContainer} container
 */

module.exports = function(container) {
	const LifetimeScope = Jumbo.Ioc.DIContainer.LifetimeScope;

	container.register(App.Services.ProjectService, "IProjectService", LifetimeScope.ScopeInstance);
	container.register(App.Services.BacklogService, "IBacklogService", LifetimeScope.ScopeInstance);
	container.register(App.Services.TaskService, "ITaskService", LifetimeScope.ScopeInstance);
	container.register(App.Facades.HomeFacade, "IHomeFacade", LifetimeScope.ScopeInstance);
};
