var express = require('express');
var loginRouter = express.Router();

module.exports = function(passport) {
	loginRouter.get('/', function(req, res) {
		res.render('login', {
			errors: req.flash('errors'),
			message: req.flash('message')
		})
	})
	.get('/candidate', function(req, res) {
		res.render('login', {
			message: req.flash('message')
		})
	})
	.post('/candidate',
		function(req, res, next) {

			passport.authenticate('candidate-strategy', function(err, user, info) {
				if (err) { return next(err); }

				if (!user) { 		
					req.flash('errors', 'Invalid email address or password.')
					return res.redirect('/login'); 
				}

				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  return res.redirect('/dashboard/candidate/' + req.user._id);
				});
			})(req, res, next);

	})

	loginRouter.get('/recruiter', function(req, res) {
		res.render('recruiterSignup', {
			errors: req.flash('errors'),
			message: req.flash('message')
		})
	})
	.post('/recruiter', 
		function(req, res, next) {
			passport.authenticate('recruiter-strategy', function(err, user, info) {
				if (err) { return next(err); }

				if (!user) { 		
					req.flash('errors', 'Invalid email address or password.')
					return res.redirect('/login'); 
				}
				req.logIn(user, function(err) {
				  if (err) { return next(err); }
				  console.log(req.user._id)
				  return res.redirect('/dashboard/recruiter/' + req.user._id);
				});
			})(req, res, next);
	})

	return loginRouter
}