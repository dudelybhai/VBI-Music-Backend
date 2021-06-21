const mongoose = require("mongoose")

const environment = process.env.NODE_ENV
const stage = require("../config")[environment]

const Schema = mongoose.Schema
const SongsSchema = require("./songs")

const playlistSchema = new Schema({
	playlist_name: {
		type: "String",
		required: true,
		trim: true,
		unique: true,
	},
	songs: [],
	user: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Playlist", playlistSchema) // instance of schema
