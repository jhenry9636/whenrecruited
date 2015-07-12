var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var base64url = require('base64url');
var slug = require('slug');

module.exports = function() {

	var getAuthToken = function() {
		return base64url(crypto.randomBytes(70))
	}

	var RecruiterSchema = new Schema({
		firstName: {
			type: String,
			require: true
		},
		lastName: {
			type: String,
			require: true
		},
		userName: {
			type: String,
			require: true
		},
		contactRequests: [{
			type: Schema.Types.ObjectId,
			ref: 'ContactRequest'
		}],
		candidates: [{
			type: Schema.Types.ObjectId,
			ref: 'Candidate'
		}],
		authToken : {
			type: 'String',
			default: getAuthToken,
			require: true,
			unique: true
		},
		emailVerified: {
			type: 'Boolean',
			default: false
		},
		emailAddress: {
			type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		},
		joinedDate: {
			type: Date,
			default : Date.now()
		},
		companyName: {
			type: String,
			default: null
		},
		isRecruiter: {
			type: 'Boolean',
			default: true
		},
		urlSlug: {
			type: 'String'
		}

	})

	RecruiterSchema.pre('save', function (next) {
		this.urlSlug = slug(this.userName)
		next()
	})

	return mongoose.model('Recruiter', RecruiterSchema)

}
