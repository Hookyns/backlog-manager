/**
 * Application inital script
 */

"use strict";

// Get application from jumbo-core
let application = require("jumbo-core").application;

// Call route config for registering locations
require("./bootstrap/locator-config")(application.getLocator());

// Call DI registrar
require("./bootstrap/di-registrar")(application.getDIContainer());

// Register template adater - not needed if you want to use default adapter
// application.setTemplateAdapter(Jumbo.Adapters.TemplateAdapter);

// Register application for run at port 80; It'll run after framework do all async jobs
application.runWhenReady(3000, function() {
	// You can do something after start

	// Extend template helpers
	require("./adapters/template/JumplateExtended");

	// const {ProjectCreateModel} = require("./app/models/ProjectCreateModel");
	// let projectCreateModel = new ProjectCreateModel();
});