const $cfg = require("jumbo-core/config-options").Configurations;
const $umjs = require("unimapperjs");
const MySqlAdapter = require("unimapperjs/adapters/MySqlAdapter");

/**
 * @name ApplicationConfig
 */
const applicationConfig = {
	/**
	 * Used for styles of Error reporting
	 * In development mode Errors will be shown in browser (browser errors not implemented yet) and in console
	 * In production mode Errors will be logged just to file if log enabled
	 */
	deployment: $cfg.Deployment.Development,

	/**
	 * For debuging; disable clustering and run app in one debugable process
	 */
	// debugMode: false,

	/**
	 * Protocol setting
	 * If you set HTTPS protocol specify privateKey and certificate paths
	 */
	protocol: {
		/**
		 * @default Http
		 */
		protocol: $cfg.Protocols.Http,

		/**
		 * Private key path
		 */
		privateKey: "data/private.key",

		/**
		 * Certificate path
		 */
		certificate: "data/certificate.crt",

		/**
		 * Or just PFX archive certificate
		 */
		pfx: "",

		/**
		 * Certifice passphrase
		 */
		passphrase: null
	},

	/**
	 * Multi-core support
	 */
	clustering: {
		/**
		 * 0 for automatic clustering driven by number of CPU's cores
		 * @default 0
		 */
		numberOfWorkers: 1
	},

	/**
	 * Enable template cache and define memory limit
	 */
	cache: {
		/**
		 * @default true
		 */
		enabled: true,

		// /**
		//  * @default HardDrive
		//  */
		// storage: $cfg.Cache.HardDrive,

		/**
		 * Size limit for templates saved in memory
		 * Jumbo store often used templates in memory
		 * @default 10 MB
		 */
		memoryCacheSizeLimit: 10e6
	},

	/**
	 * Session configuration
	 */
	session: {
		/**
		 * Name of cookie which stores users's session ID
		 */
		sessionsCookieName: "JUMBOSESID",

		/**
		 * Length of session's life in days. It'll be deleted from disk after that time
		 * @type {Number} Number of days
		 * @default 30
		 */
		sessionLifetime: 30,

		/**
		 * Limit size of data saved in memory
		 * Not implemented yet
		 */
		memorySizeLimit: 20e6,

		/**
		 * Disable sessions saving to disk - speed boost
		 * When true, memorySizeLimit is ignored
		 * @default false
		 */
		justInMemory: false,
	},

	/**
	 * Enable log and set log level
	 */
	log: {
		/**
		 * @default true
		 */
		enabled: true,

		/**
		 * @default Normal
		 */
		level: $cfg.LogLevels.Warning
	},

	/**
	 * Maximal allowed number of requests per second. You can limit server stress.
	 * If more than specified request count will come, new requests in rest of one second obtain 429 code.
	 * Static files are counted into this number of requests
	 * @default null
	 * @type { Number || null }
	 */
	maxRequestPerSecond: null,

	/**
	 * Enable prevention of (D)DOS attacks
	 * It internally enable requests monitoring which will count number of requests per IP
	 * If IP makes more request per second new requests from that IP will be refused with code 403.
	 * Requests will be still accepted by server but framework will refuse to continue and save resources which
	 * proccessing of that request can framework take.
	 */
	DOSPrevention: {
		/**
		 * @default true
		 */
		enabled: false,

		/**
		 * The limit of request per second from same IP
		 * @description Warn! If you use framework static server and your index page have
		 * more than 100 links (scripts, styles, images etc.) client will be blocked!
		 * @default 100
		 */
		maxRequestPerIP: 100,

		/**
		 * Duration of IP blocking [in seconds]
		 * @default 3600
		 */
		blockTime: 3600
	},

	/**
	 * Allows you to use more languages (defined in URL right after first slash; eg. domain.tld/en-us/page/article/1)
	 */
	globalization: {
		/**
		 * Allow using languages
		 */
		enabled: true,

		/**
		 * Supported languages
		 */
		supportedLocales: ["cs-CZ"],

		/**
		 * Default language
		 */
		defaultLocale: "cs-CZ"
	},

	/**
	 * Maximal size of POST data
	 * @default 5 MB
	 */
	maxPostDataSize: 5e6,

	/**
	 * Enable running tests before application start
	 * Not implemented yet
	 * @default true
	 */
	doTestsAfterRun: false,

	/**
	 * Object with domains
	 */
	domains: {
		default: $umjs.createDomain(MySqlAdapter, {
			host: "localhost",
			user: "test",
			password: "test",
			database: "node-task-manager"
		})
	}

	// You can define your own settings here,.. it'll be available via global Jumbo.config
};

module.exports = applicationConfig;