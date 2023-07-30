const App = require("./index.js");

const app = new App();

app.get("/", async (req, res) => {
	res.send("Hello World")
});

app.get("/hey", async (req, res) => {
	res.json({data: "hello world"})
});