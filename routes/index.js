const users = require("./users")
const songs = require("./songs")
const playlists = require("./playlists")
module.exports = (router) => {
	users(router)
	songs(router)
	playlists(router)
	return router
}
