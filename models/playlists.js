const mongoose = require("mongoose")

const environment = process.env.NODE_ENV
const stage = require("../config")[environment]

const Schema = mongoose.Schema
const SongSchema = require("./songs")

const playlistSchema = new Schema({
	name: {
		type: "String",
		required: true,
		trim: true,
		unique: true,
	},
	songs: [SongSchema],
})

module.exports = mongoose.model("Playlist", playlistSchema) // instance of schema
