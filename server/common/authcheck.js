module.exports = function(req, res, next) {
	if(!req.isAuthenticated()) {
		console.log('Not logged in')
		return res.redirect('/')
	}
	return next()
}