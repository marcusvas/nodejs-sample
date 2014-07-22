'use strict';

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    Account = require('../models/account');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.use(new LocalStrategy(Account.authenticate()));
    passport.serializeUser(Account.serializeUser());
    passport.deserializeUser(Account.deserializeUser());
};

