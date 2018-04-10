const $umjs = require("unimapperjs");
const $path = require("path");
const domain = require("../config").domains.default;

// Discove all entities
$umjs.initEntitiesFrom($path.resolve(__dirname, "../app/domain"));

setImmediate(async () => {
	await domain.createMigration($path.resolve(__dirname, "../migrations"));
	await domain.dispose();
});