const express = require("express");
const brainly = require("brainly-scraper");
const app = express();
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
	var data = req.query.data;
	data.replace(/%20/g, " ");
	console.log(data);

	if (!data) {
		return res
			.json({
				status: "error",
				message: "query data tidak ditemukan",
			})
			.status(500);
	}

	var result = brainly(data).then(a => {
		return res.json({
			status: "success",
			data: {
				total: a.length,
				response: a.data,
			},
		});
	});
});

http: app.listen(port, () => console.log(`listening on http://localhost:${port}`));
