/**
 * Locator configuration - setting host, sub-domains and locations
 * @param {Locator} locator
 */
module.exports = function(locator) {
	const types = locator.constructor.ParamType;

	locator.setMainSubdomain("www"); // Default sub-domain which will route to base app; both urls with and without www will work

	locator.addLocation("backlogDetail", "Backlog/detail/$backlogId/$controller[/$action[/$id]]");

	// Default route - let it last
	locator.addDefaultLocation("[$controller[/$action[/$id]]]");

	locator.addUrlAlias("/public/favicon.ico", "/favicon.ico");
};