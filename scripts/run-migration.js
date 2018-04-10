const $path = require("path");
const domain = require("../config").domains.default;

setImmediate(async () => {
	await domain.runMigration($path.resolve(__dirname, "../migrations"));
	await domain.dispose();
});