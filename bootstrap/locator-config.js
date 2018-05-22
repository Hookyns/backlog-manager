/**
 * Locator configuration - setting host, sub-domains and locations
 * @param {Locator} locator
 */
module.exports = function(locator) {
	const types = locator.constructor.ParamType;

	/*
	 * DOMAINS
	 **************************************************************************************************/
	// Default sub-domain which will route to base app; both urls with and without www will work
	locator.setMainSubdomain("www");


	/*
	 * LOCATIONS
	 **************************************************************************************************/
	// Backlog detail - nested URL
	locator.addLocation("backlogDetail", "Backlog/detail/$backlogId/$controller[/$action[/$id]]");

	// Default route - let it last
	locator.addDefaultLocation("[$controller[/$action[/$id]]]");


	/*
	 * URL ALIASES
	 **************************************************************************************************/
	locator.addUrlAlias("/public/favicon.ico", "/favicon.ico");
};