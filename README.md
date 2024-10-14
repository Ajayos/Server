# EXPRESS SERVER

## Express-based HTTP server, handles server-related functionalities like starting and stopping the server, retrieving host information, getting active network interfaces, and formatting memory usage, with usage of environment variables for configuration.

[![@ajayos/Server](https://img.shields.io/npm/v/@ajayos/server.svg)](https://www.npmjs.com/package/@ajayos/server)

This package is a powerful and flexible HTTP server built on top of Express, offering various server functionalities and utilities for developers.

## Installation

```bash
npm install @ajayos/server
```

## Quick Start

### Basic Usage

Here’s a quick example to get your server up and running:

```javascript
const { SERVER } = require('@ajayos/server'); // Import the server package

const app = new SERVER({
	port: 3000, // PORT
}); // Create a new server instance

// Define a route for the root URL
app.get('/', async (req, res) => {
	res.send('Hello World'); // Send a simple response
});

// Define another route
app.get('/hey', async (req, res) => {
	res.json({ data: 'hello world' }); // Respond with JSON data
});

// Start the server
app.start(); // Call the start method to begin listening
```

Here’s a more comprehensive example showcasing various functionalities:

```javascript
const { SERVER } = require('@ajayos/server'); // Import the server package

const app = new SERVER({
	port: 3000,
}); // Create a new server instance

// Middleware to log requests
app.use((req, res, next) => {
	console.log(`${req.method} request for '${req.url}'`);
	next(); // Call the next middleware or route handler
});

// Define routes
app.get('/', async (req, res) => {
	res.send('Welcome to the Express Server!'); // Send a welcome message
});

// Start the server with error handling
app
	.start()
	.then(() => console.log(`Server running on port ${app.port}`))
	.catch(err => console.error('Failed to start server:', err));
```

## Features

- **Easy Setup**: Quick configuration with minimal setup.
- **Custom Routing**: Supports GET, POST, PUT, and DELETE methods for routing.
- **Host Information**: Easily retrieve host information and active network interfaces.
- **Server Management**: Handle server startup and graceful shutdown processes.

## Example

Additional example of how to use the package can be found in the [example](./example.js) file.

`const app = express();`

use with

```
app.app
```

## Documentation

View documentation on [API](./API.md)


## License

This package is open-source and available under the [Apache-2.0 License](./LICENSE). Feel free to use, modify, and distribute it as you see fit.
