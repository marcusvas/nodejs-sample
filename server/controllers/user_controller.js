'use strict';

var passport = require('passport');
var Account = require('../models/account');
var Authorization = require('../util/authorization');

module.exports = function(app) {
	app.get("/old", function(req, res) {
		res.render('index2', {
    		pagename: 'awesome people',
    		authors: ['Paul', 'Jim', 'Jane'],
    		user: req.user
		});
	});
	
	app.get('/register', function(req, res) {
      	res.render('register');
  	});
  	
	app.post('/register', function(req, res) {
		Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
			if (err) {
				return res.render('register', { account : account });
			}
			passport.authenticate('local')(req, res, function () {
				res.redirect('/');
			});
		});
	});
	
	app.get('/login', function(req, res) {
	  res.render('login', { user : req.user });
	});
	
	app.post('/login', passport.authenticate('local'), function(req, res) {
	  res.redirect('/produtos');
	});
	
	app.get('/logout', function(req, res) {
	  req.logout();
	  res.redirect('/');
	});
	
	app.get('/ping', Authorization.isAuthenticated, function(req, res){
	  res.send("pong!", 200);
	});
};