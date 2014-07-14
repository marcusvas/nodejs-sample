module.exports = function(app) {
	app.get("/api1", function(req, res) {
		console.log('api1');
	});
};