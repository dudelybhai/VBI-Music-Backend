const PlaylistController = require("../controllers/playlists")
const validateToken = require("../utils").validateToken

module.exports = (router) => {
	router.route("/playlist/:id").post(PlaylistController.create)
	router.route("/playlist/:id").get(PlaylistController.list)
	router.route("/songs/playlist/:id").post(PlaylistController.addSong)
}
