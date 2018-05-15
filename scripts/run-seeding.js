const $umjs = require("unimapperjs");
const $path = require("path");
const domain = require("../config").domains.default;

// Discover all entities
$umjs.initEntitiesFrom($path.resolve(__dirname, "../app/domain"));

setImmediate(async () => {
	await domain.runSeeding();
	await domain.dispose();
});