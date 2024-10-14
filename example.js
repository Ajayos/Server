const { SERVER } = require('@ajayos/server');

const app = new SERVER({
	port: 3002,
	onServerStart: () => {
		app.log('Server is running on port 3002');
	},
});

app.get('/', async (req, res) => {
	res.send('Hello World');
});

app.get('/hey', async (req, res) => {
	res.json({ data: 'hello world' });
});

app.get('/ip', async (req, res) => {
	const data = app.getActiveNetworkInterfaces();
	res.json({ data });
});

app.start();
