var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

module.exports = function () {
	passport.use(new LocalStrategy({
			usernameField: 'username',
			passportField: 'passport'
		} ,
		function (username, passport, done) {
			var user = {
				username: username,
				password: password
			};
			done(null, user);
		}));
};