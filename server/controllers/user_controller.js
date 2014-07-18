module.exports = function(app) {
	app.get("/", function(req, res) {
		res.render('index', {
    		pagename: 'awesome people',
    		authors: ['Paul', 'Jim', 'Jane']
		});
	});
}