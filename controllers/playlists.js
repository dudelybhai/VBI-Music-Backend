const Playlist = require("../models/playlists")

module.exports = {
	create: (req, res) => {
		let result = {}
		let status = 200
		user = req.params.id
		const { playlist_name } = req.body
		const playlist = new Playlist({
			playlist_name,
			user,
		})

		playlist.save((err, playlist) => {
			if (!err) {
				result.status = status
				result.result = playlist
				result.message = "playlist created successfully"
			} else {
				status = 400
				result.status = status
				result.message = `playlist with ${playlist_name} already exists`
			}
			res.status(status).send(result)
		})
	},
	list: (req, res) => {
		let result = {}
		let status = 200
		Playlist.find({}, (err, playlists) => {
			if (!err) {
				result.status = status
				result.result = playlists
			} else {
				status = 500
				result.status = status
				result.error = err
			}
			res.status(status).send(result)
		})
	},
	addSong: async function (req, res) {
		let result = {}
		let status = 200
		id = req.params.id
		console.log(id)
		const { songs } = req.body
		console.log(req.body)
		// const playlist = new Playlist({
		// 	songs,
		// })
		var playlistData = await Playlist.findOne({ _id: id })
		playlistData.songs = songs
		playlistData.save((err, playlist) => {
			if (!err) {
				result.status = status
				result.result = playlist
				result.message = "songs  added successfully"
			} else {
				status = 400
				result.status = status
				result.error = err
			}
			res.status(status).send(result)
		})
	},
}
