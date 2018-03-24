/**
 * Locator configuration - setting host, sub-domains and locations
 * @param {Locator} locator
 */
module.exports = function(locator) {
	const types = locator.constructor.ParamType;

	// locator.setHost("nodetask.net:3000"); // Detection of sub-apps and link creation
	locator.setMainSubdomain("www"); // Default sub-domain which will route to base app; both urls with and without www will work

	// Default route - let it last
	locator.addDefaultLocation("[$controller[/$action[/$id]]]");

	locator.addUrlAlias("/public/favicon.ico", "/favicon.ico");
};