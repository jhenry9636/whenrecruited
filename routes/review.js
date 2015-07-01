var express = require('express');
var reviewRouter = express.Router();


module.exports = function(ReviewsModel) {

	reviewRouter.route('/')
	
		.get(function(req, res) {
			ReviewsModel.find()
				.exec(function(err, review) {
					if(err) throw err
					res.status(200).json(review)
				})
		})

		.post(function(req, res) {
			var review = new ReviewsModel(req.body);
			console.log(req.body)
			review.save(function(err) {
				if(err) throw err
								console.log(req.body)

				res.send(review)
			})
		})


	reviewRouter.route('/:reviewId')
		.get(function(req, res) {
			var id = req.params.reviewId;

			ReviewsModel.findById(id, function(err, review) {
				if(err) throw err
				res.send(review);
			})
		})

		.delete(function(req, res) {
			var id = req.params.recruiterId;

			ReviewsModel.findById(id, function(err, review) {
				if(err) throw err
				review.remove(function(err) {
					if(err) throw err
					res.status(204).send('Removed')
				})
			})
		})

	return reviewRouter
}
