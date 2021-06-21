const jwt = require("jsonwebtoken")
const Song = require("../models/songs")

module.exports = {
	add: (req, res) => {
		let result = {}
		let status = 200
		const { title, singers, album } = req.body
		const song = new Song({
			title,
			singers,
			album,
		})
		song.save((err, song) => {
			if (!err) {
				result.status = status
				result.result = song
				result.message = "song created successfully"
			} else {
				status = 400
				result.status = status
				result.message = `Song with ${title} title already exists`
			}
			res.status(status).send(result)
		})
	},
	list: (req, res) => {
		let result = {}
		let status = 200
		Song.find({}, (err, songs) => {
			if (!err) {
				result.status = status
				result.result = songs
			} else {
				status = 500
				result.status = status
				result.error = err
			}
			res.status(status).send(result)
		})
	},
	searchSong: async function (req, res) {
		let result = {}
		let status = 200
		let searchValue = req.query.value
		console.log(searchValue)
		var song_details = await Song.find({
			title: new RegExp(searchValue, "i"),
		})
		res.status(200).send(song_details)
	},
}
