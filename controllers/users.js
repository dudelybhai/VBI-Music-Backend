const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/users")
// const Playlist = require("../models/playlists")

module.exports = {
	add: (req, res) => {
		let result = {}
		let status = 200
		const { username, password } = req.body
		const user = new User({
			username,
			password,
		})
		user.save((err, user) => {
			if (!err) {
				result.status = status
				result.result = user
				result.message = "user created successfully"
			} else {
				status = 400
				result.status = status
				result.message = `username with ${username} already exist`
			}
			res.status(status).send(result)
		})
	},

	login: (req, res) => {
		const { username, password } = req.body
		let result = {}
		let status = 200
		User.findOne({ username }, (err, user) => {
			if (!err && user) {
				// We could compare passwords in our model instead of below as well
				bcrypt
					.compare(password, user.password)
					.then((match) => {
						if (match) {
							status = 200
							// Create a token
							const payload = { user: user.username }
							const options = { expiresIn: "2d", issuer: "https://dudelybhai.github.io" }
							const secret = process.env.JWT_SECRET
							const token = jwt.sign(payload, secret, options)
							result.token = token
							result.status = status
							result.result = user
							result.message = "Login Success"
							result.status = 1
						} else {
							status = 401
							result.status = status
							result.error = `username or password is incorrect`
						}
						res.status(status).send(result)
					})
					.catch((err) => {
						status = 500
						result.status = status
						result.error = err
						res.status(status).send(result)
					})
			} else {
				status = 404
				result.status = status
				result.message = `Invalid Login`
				res.status(status).send(result)
			}
		})
	},

	getAll: (req, res) => {
		let result = {}
		let status = 200

		User.find({}, (err, users) => {
			if (!err) {
				result.status = status
				result.result = users
			} else {
				status = 500
				result.status = status
				result.error = err
			}
			res.status(status).send(result)
		})
	},
}
