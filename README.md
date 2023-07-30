# EXPRESS SERVER
## Express-based HTTP server, handles server-related functionalities like starting and stopping the server, retrieving host information, getting active network interfaces, and formatting memory usage, with usage of environment variables for configuration.



[![@ajayos/Server](https://img.shields.io/npm/v/@ajayos/server.svg)](https://www.npmjs.com/package/@ajayos/server)

A powerful and flexible HTTP server package built on top of Express, providing various server functionalities and utilities.

## Installation

```bash
npm install @ajayos/server
```

## Usage

```javascript
const App = require("@ajayos/server");

const app = new App();

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.get("/hey", async (req, res) => {
  res.json({ data: "hello world" });
});
```

## Features

- Easy setup and configuration.
- Custom routing with support for GET, POST, PUT, and DELETE methods.
- Retrieving host information and active network interfaces.
- Formatting memory usage in a human-readable format.
- Handling server startup and graceful shutdown.

## Examples

Additional examples of how to use the package can be found in the [examples](./examples.js) file.

## Configuration

The server can be configured by setting the following environment variables in a `.env` file:

- `PORT`: The port on which the server will listen. If not specified, the server will default to port 3000.

Example .env file:

```
PORT=5000
```

Remember to place the `.env` file in the root directory of your project alongside the server code.

``
const app = express();
``

use with 
```
app.app
```
## License

This package is open-source and available under the [Apache-2.0 License](./LICENSE). Feel free to use, modify, and distribute it as you see fit.

