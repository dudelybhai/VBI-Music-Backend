const SongController = require("../controllers/songs")
const validateToken = require("../utils").validateToken

module.exports = (router) => {
	router.route("/song").post(SongController.add)
	router.route("/song").get(SongController.list)
	router.route("/song/search").get(SongController.searchSong)
}
