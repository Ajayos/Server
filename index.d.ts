import express, {
	Application,
	Request,
	RequestHandler,
	Response,
} from 'express';
import bodyParser, { urlencoded } from 'body-parser';
import { Server } from 'http';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import 'colors';
/**
 * Configuration interface for the server.
 *
 * @interface Config
 *
 * @property {number} [port] - The port number on which the server will listen.
 * @property {boolean} [cors] - Enable or disable Cross-Origin Resource Sharing (CORS).
 * @property {boolean} [helmet] - Enable or disable Helmet for security headers.
 * @property {boolean} [bodyParser] - Enable or disable body parsing middleware.
 * @property {boolean} [cookieParser] - Enable or disable cookie parsing middleware.
 * @property {boolean} [https] - Enable or disable HTTPS.
 * @property {Object} [options] - Options for HTTPS configuration.
 * @property {string} options.key - The private key for HTTPS.
 * @property {string} options.cert - The certificate for HTTPS.
 */
interface Config {
	/**
	 * The port number on which the server will listen.
	 * @type {number} - The port number on which the server will listen
	 */
	port?: number;
	/**
	 * Enable or disable Cross-Origin Resource Sharing (CORS).
	 * @type {boolean | object} - Enable or disable Cross-Origin Resource Sharing (CORS)
	 */
	cors?: boolean | object;
	/**
	 * Enable or disable Helmet for security headers.
	 * @type {boolean | object} - Enable or disable Helmet for security headers
	 */
	helmet?: boolean | object;
	/**
	 * Enable or disable body parsing middleware.
	 * @type {boolean | object} - Enable or disable body parsing middleware
	 */
	bodyParser?: boolean | object;
	/**
	 * Enable or disable cookie parsing middleware.
	 * @type {boolean} - Enable or disable cookie parsing middleware
	 */
	cookieParser?: boolean;
	/**
	 * Options for HTTPS configuration.
	 * @type {Object} - Options for HTTPS configuration
	 * @property {string} key - The private key for HTTPS
	 * @property {string} cert - The certificate for HTTPS
	 */
	options:
		| {
				key: string;
				cert: string;
		  }
		| false;
	/**
	 * Call the function on the server start
	 */
	onServerStart?: () => void;
	/**
	 * Call the function on the server close with Error
	 */
	onServerError?: () => void;
}
/**
 * The `SERVER` class is responsible for managing the server instance, configuring middleware,
 * and handling incoming requests and responses. It provides methods to initialize the server,
 * configure middleware, register route handlers, and manage various server operations.
 *
 * @class
 * @property {Server} server - The HTTP server instance that handles incoming requests and responses.
 * @property {Application & { config?: any }} app - The main Express application instance.
 * @property {number} port - The port number on which the server listens.
 * @property {Config} config - Configuration object for the server.
 *
 * @example
 * // Basic usage of the SERVER class with a simple GET route.
 * const server = new SERVER({ port: 3000 });
 * server.get('/', (req, res) => res.send('Hello, World!'));
 * server.start(); // Start the server
 *
 * @example
 * // Enabling additional middleware like CORS, Helmet, and body-parser.
 * const server = new SERVER({ cors: true, helmet: true, bodyParser: true, port: 3000 });
 * server.get('/', (req, res) => res.send('Hello, Secure World!'));
 * server.start(); // Start the server with middleware enabled
 *
 * @example
 * // Using HTTPS with custom key and certificate options.
 * const server = new SERVER({
 *   port: 8443,
 *   options: { key: 'path/to/key.pem', cert: 'path/to/cert.pem' }
 * });
 * server.get('/secure', (req, res) => res.send('Hello, HTTPS!'));
 * server.start(); // Start the HTTPS server
 *
 * @method start - Starts the server, applies middleware, and listens on the specified port.
 *
 * @example
 * const server = new SERVER({ port: 3000 });
 * server.start(); // Starts the server on port 3000
 *
 * @method log - Logs a message to the console with a specified type ('info', 'error', 'warn', etc.) and color formatting.
 *
 * @example
 * server.log('Server is running', 'info');
 *
 * @param {string} text - The message to log.
 * @param {string} [type='info'] - The type of log message.
 *
 * @method close - Closes the server and terminates the process.
 * @example
 * server.close();
 */
declare class SERVER {
	/**
	 * The server instance that handles incoming requests and responses.
	 * This is an instance of the `Server` class.
	 */
	server: Server;
	/**
	 * Represents the main application instance.
	 *
	 * @type {Application & { config?: any }}
	 *
	 * @property {Application} app - The main application instance.
	 * @property {any} [config] - Optional configuration object for the application.
	 */
	app: Application & {
		config?: any;
	};
	private port;
	/**
	 * Configuration object for the server.
	 *
	 * @property {boolean | object} cors - Enable or disable Cross-Origin Resource Sharing (CORS).
	 * @property {number} port - Port number on which the server will listen.
	 * @property {boolean | object} helmet - Enable or disable Helmet for securing HTTP headers.
	 * @property {boolean | object } bodyParser - Enable or disable body-parser middleware.
	 * @property {boolean} cookieParser - Enable or disable cookie-parser middleware.
	 * @property {Object} options - Options for HTTPS configuration.
	 * @property {string} options.key - Path to the SSL key file.
	 * @property {string} options.cert - Path to the SSL certificate file.
	 */
	private config;
	/**
	 * Initializes a new instance of the server with the given configuration.
	 *
	 * @param config - The configuration object for the server.
	 *
	 * @property {number} [port] - The port number on which the server will listen.
	 * @property {boolean} [cors] - Enable or disable Cross-Origin Resource Sharing (CORS).
	 * @property {boolean} [helmet] - Enable or disable Helmet for security headers.
	 * @property {boolean} [bodyParser] - Enable or disable body parsing middleware.
	 * @property {boolean} [cookieParser] - Enable or disable cookie parsing middleware.
	 * @property {boolean} [https] - Enable or disable HTTPS.
	 * @property {Object} [options] - Options for HTTPS configuration.
	 * @property {string} options.key - The private key for HTTPS.
	 * @property {string} options.cert - The certificate for HTTPS.
	 * @remarks
	 * - Merges the provided configuration with the default configuration.
	 * - Sets the server port, defaulting to 8123 if not specified.
	 * - Initializes the Express application.
	 * - Creates an HTTP or HTTPS server based on the configuration.
	 */
	constructor(config: Config);
	/**
	 * Configures middleware for the application based on the provided configuration.
	 *
	 * This method sets up the following middleware if enabled in the configuration:
	 * - CORS: Cross-Origin Resource Sharing
	 * - Helmet: Security headers
	 * - Body Parser: JSON request body parsing
	 * - Cookie Parser: Cookie parsing
	 *
	 * @private
	 */
	private configureMiddleware;
	/**
	 * Initializes the server by configuring middleware and starting the server.
	 *
	 * This method performs the following actions:
	 * - Configures the middleware for the server.
	 * - Starts the server and listens on the specified port.
	 * - Attaches an error handler to the server.
	 *
	 * @private
	 */
	start(): void;
	/**
	 * Callback function that is executed when the server starts.
	 * It logs the server start message and port
	 *
	 * @private
	 * @method
	 */
	onServerStart: () => void;
	/**
	 * Logs a message to the console with a specified type and color formatting.
	 *
	 * @param {string} [text] - The message to log. If undefined, a separator line is logged.
	 * @param {string} [type='info'] - The type of log message. Can be one of the following:
	 * - 'e' or 'error': Logs an error message in red.
	 * - 'w' or 'warn': Logs a warning message in yellow.
	 * - 'i' or 'info': Logs an informational message in green.
	 * - 'd' or 'debug': Logs a debug message in magenta.
	 * - 'f' or 'fatal': Logs a fatal error message with a red background and white text.
	 * - 'l' or 'line': Logs a separator line.
	 * If the type is not recognized, it defaults to 'info'.
	 *
	 * @returns {void}
	 */
	log(text?: string, type?: string): void;
	/**
	 * Handles server errors.
	 *
	 * @param error - The error object containing details about the server error.
	 * @remarks
	 * If the error code is 'EADDRINUSE', it indicates that the port is already in use.
	 * In this case, it logs an error message and attempts to check the port availability
	 * after a delay of 5 seconds. If the port becomes available, it tries to listen on the port again.
	 * Otherwise, it exits the process with a status code of 1.
	 *
	 * For other types of errors, it logs the error message and exits the process with a status code of 1.
	 */
	onServerError: (error: any) => void;
	/**
	 * Retrieves the active network interfaces on the server.
	 *
	 * This method returns an object where the keys are the names of the network interfaces,
	 * and the values are arrays of IP addresses associated with each interface. Only non-internal
	 * (i.e., external) interfaces are included in the result.
	 *
	 * @returns {object} An object containing the active network interfaces and their associated IP addresses.
	 */
	getActiveNetworkInterfaces(): object;
	/**
	 * Registers middleware functions to be used by the application.
	 *
	 * @param {...RequestHandler[]} middleware - The middleware functions to be used.
	 * @returns {void}
	 */
	use: (...middleware: RequestHandler[]) => void;
	/**
	 * Enables Cross-Origin Resource Sharing (CORS) with optional configuration.
	 *
	 * @param {object} config - Configuration options for the CORS middleware.
	 * @returns {void}
	 */
	cors: (config?: object) => void;
	/**
	 * Applies the Helmet middleware to enhance security by setting various HTTP headers.
	 *
	 * @param {...any[]} config - Configuration options for Helmet middleware.
	 * @returns {void}
	 */
	helmet: (...config: any[]) => void;
	/**
	 * Registers body-parsing middleware with optional configuration.
	 * Allows parsing of JSON and URL-encoded request bodies.
	 *
	 * @param {...RequestHandler[]} config - Configuration options for bodyParser middleware.
	 * @returns {void}
	 */
	bodyParser: (...config: RequestHandler[]) => void;
	/**
	 * Registers a GET request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	get: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a POST request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	post: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a PUT request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	put: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a DELETE request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	delete: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a PATCH request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	patch: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers an OPTIONS request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	options: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a HEAD request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	head: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a CONNECT request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	connect: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a TRACE request handler for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	trace: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Registers a handler for all HTTP methods for a specified route.
	 *
	 * @param {...[string, ...RequestHandler[]]} config - Route path and handler functions.
	 * @returns {void}
	 */
	all: (
		config_0: string,
		...config: express.RequestHandler<
			import('express-serve-static-core').ParamsDictionary,
			any,
			any,
			import('qs').ParsedQs,
			Record<string, any>
		>[]
	) => void;
	/**
	 * Applies cookie parser middleware.
	 *
	 * @param {...RequestHandler[]} config - Configuration options for cookie parsing middleware.
	 * @returns {void}
	 */
	cookie: (...config: RequestHandler[]) => void;
	/**
	 * Serves static files from the specified directory.
	 *
	 * @param {string} path - Path to the directory containing static files.
	 * @returns {void}
	 */
	static: (path: string) => void;
	/**
	 * Retrieves the current memory usage of the Node.js process.
	 *
	 * @returns {object} An object containing formatted memory usage statistics:
	 * - `rss`: Resident Set Size, the portion of the process's memory held in RAM.
	 * - `heapTotal`: Total size of the allocated heap.
	 * - `heapUsed`: Actual memory used during the execution.
	 * - `external`: Memory usage of C++ objects bound to JavaScript objects managed by V8.
	 */
	getMemoryUsage(): object;
	/**
	 * Closes the server and terminates the process.
	 * Gracefully shuts down the server, ensuring all connections are closed.
	 */
	close(): void;
}
export {
	Application,
	bodyParser,
	cors,
	helmet,
	cookieParser,
	Server,
	urlencoded,
	SERVER as default,
	SERVER,
	Config,
	Request,
	Response,
};
