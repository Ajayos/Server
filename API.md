# API Documentation

## Table of Contents

- [API Documentation](#api-documentation)
  - [Table of Contents](#table-of-contents)
  - [Server Setup](#server-setup)
    - [HTTP Server](#http-server)
    - [HTTPS Server](#https-server)
  - [CORS Configuration](#cors-configuration)
    - [Option 1: Configure on Server Creation](#option-1-configure-on-server-creation)
    - [Option 2: Enable Default CORS](#option-2-enable-default-cors)
    - [Option 3: Custom CORS](#option-3-custom-cors)
  - [Helmet Configuration](#helmet-configuration)
    - [Option 1: Configure on Server Creation (Helmet)](#option-1-configure-on-server-creation-helmet)
    - [Option 2: Enable Default Helmet](#option-2-enable-default-helmet)
    - [Option 3: Custom Helmet](#option-3-custom-helmet)
  - [BodyParser Configuration](#bodyparser-configuration)
    - [Option 1: Configure on Server Creation (BodyParser)](#option-1-configure-on-server-creation-bodyparser)
    - [Option 2: Enable Default BodyParser](#option-2-enable-default-bodyparser)
    - [Option 3: Custom BodyParser](#option-3-custom-bodyparser)
  - [HTTP Methods](#http-methods)
    - [GET Method](#get-method)
    - [POST Method](#post-method)
    - [PUT Method](#put-method)
    - [DELETE Method](#delete-method)
  - [Custom Server Events](#custom-server-events)
    - [onServerStart](#onserverstart)
    - [onServerError](#onservererror)
  - [Static File Serving](#static-file-serving)
  - [Utility Methods](#utility-methods)
    - [Network Interfaces](#network-interfaces)
    - [Memory Usage](#memory-usage)

---

## Server Setup

### HTTP Server

To set up the server, import the `SERVER` class from your module and create a new instance with the desired configuration.

```js
const { SERVER } = require('@ajayos/server');

const app = new SERVER({
	port: 3002,
	cors: true, // Enable CORS globally
	helmet: true, // Enable Helmet globally for security headers
	bodyParser: true, // Enable body parsing globally
});

app.get('/', async (req, res) => {
	res.send('Hello World');
});

// Start the server
app.start();
```

### HTTPS Server

To use HTTPS, provide the SSL certificates (`key` and `cert`):

```js
const fs = require('fs');
const { SERVER } = require('@ajayos/server');

const app = new SERVER({
	port: 3002,
	ssl: {
		key: fs.readFileSync('/path/to/key.pem'),
		cert: fs.readFileSync('/path/to/cert.pem'),
	},
	helmet: true, // Enable Helmet globally for security headers
	bodyParser: true, // Enable body parsing globally
});

app.get('/', async (req, res) => {
	res.send('Hello Secure World');
});

app.start();
```

---

## CORS Configuration

You can configure CORS in three different ways:

### Option 1: Configure on Server Creation

When initializing the server, you can enable CORS by passing it as an option. This will apply CORS globally.

```js
const app = new SERVER({
	port: 3002,
	cors: true, // Enable default CORS globally
});
```

To customize CORS settings, you can pass a configuration object:

```js
const app = new SERVER({
	port: 3002,
	cors: { origin: '*' }, // Custom CORS configuration
});
```

### Option 2: Enable Default CORS

You can also enable CORS later using the `app.cors()` method. This will apply CORS with default settings.

```js
app.cors(); // Enable default CORS
```

### Option 3: Custom CORS

To configure custom CORS options, pass a configuration object to `app.cors()`:

```js
app.cors({
	origin: 'https://example.com',
	methods: 'GET,POST,PUT',
	credentials: true,
});
```

---

## Helmet Configuration

Helmet enhances security by setting various HTTP headers. You can configure it in three ways:

### Option 1: Configure on Server Creation (Helmet)

Enable Helmet when creating the server:

```js
const app = new SERVER({
	port: 3002,
	helmet: true, // Enable default Helmet globally
});
```

### Option 2: Enable Default Helmet

You can enable Helmet after initialization using the `app.helmet()` method:

```js
app.helmet(); // Enable default Helmet
```

### Option 3: Custom Helmet

Pass a custom configuration object to `app.helmet()` for specific security headers:

```js
app.helmet({
	contentSecurityPolicy: false, // Disable CSP
	dnsPrefetchControl: { allow: true }, // Allow DNS prefetching
});
```

---

## BodyParser Configuration

BodyParser allows parsing of incoming request bodies. You can configure it in three ways:

### Option 1: Configure on Server Creation (BodyParser)

Enable BodyParser when creating the server:

```js
const app = new SERVER({
	port: 3002,
	bodyParser: true, // Enable default BodyParser globally
});
```

### Option 2: Enable Default BodyParser

You can enable BodyParser after initialization using the `app.bodyParser()` method:

```js
app.bodyParser(); // Enable default BodyParser for JSON and URL-encoded bodies
```

### Option 3: Custom BodyParser

Pass custom configuration options to `app.bodyParser()`:

```js
app.bodyParser(
	bodyParser.json({ limit: '10mb' }),
	app.urlencoded({ extended: true }),
);
```

---

## HTTP Methods

Here are examples of defining routes for various HTTP methods.

### GET Method

```js
app.get('/api/data', async (req, res) => {
	res.json({ data: 'Sample Data' });
});
```

### POST Method

```js
app.post('/api/data', async (req, res) => {
	const { name } = req.body;
	res.json({ message: `Hello, ${name}` });
});
```

### PUT Method

```js
app.put('/api/data/:id', async (req, res) => {
	const { id } = req.params;
	res.json({ message: `Data with ID ${id} updated.` });
});
```

### DELETE Method

```js
app.delete('/api/data/:id', async (req, res) => {
	const { id } = req.params;
	res.json({ message: `Data with ID ${id} deleted.` });
});
```

---

## Custom Server Events

### onServerStart

You can override the `onServerStart` event to execute code when the server starts:

```js
const app = new SERVER({
	port: 3002,
	onServerStart: () => {
		console.log('Server started successfully on port 3002');
	},
});
```

### onServerError

You can override the `onServerError` event to handle server errors:

```js
const app = new SERVER({
	port: 3002,
	onServerError: error => {
		console.error('Server encountered an error:', error);
	},
});
```

---

## Static File Serving

You can serve static files using the `static()` method:

```js
app.static('/public');
```

This will serve files from the `/public` directory.

---

## Utility Methods

### Network Interfaces

To get the active network interfaces, use `getActiveNetworkInterfaces()`:

```js
app.get('/api/network', async (req, res) => {
	const interfaces = await app.getActiveNetworkInterfaces();
	res.json({ interfaces });
});
```

### Memory Usage

To get the current memory usage, use `getMemoryUsage()`:

```js
app.get('/api/memory', async (req, res) => {
	const memoryUsage = app.getMemoryUsage();
	res.json({ memoryUsage });
});
```

The response will contain:

- `rss`: Resident Set Size
- `heapTotal`: Total allocated heap
- `heapUsed`: Memory used from the heap
- `external`: Memory usage of C++ objects

---
