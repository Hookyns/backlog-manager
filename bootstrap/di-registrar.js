/**
 * Dependency registrar - registration of Types
 * @param {DIContainer} container
 */
module.exports = function(container) {
	const LifetimeScope = Jumbo.Ioc.DIContainer.LifetimeScope;

	container.register(App.Services.Foo, "Foo", LifetimeScope.ScopeInstance);
	container.register(App.Services.TestService, "TestService", LifetimeScope.ScopeInstance);
};