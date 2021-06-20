const mongoose = require("mongoose")

const environment = process.env.NODE_ENV
const stage = require("../config")[environment]

const Schema = mongoose.Schema

const songSchema = new Schema({
	title: {
		type: "String",
		required: true,
		trim: true,
		unique: true,
	},
	singers: {
		type: "String",
		required: true,
		trim: true,
	},
	album: {
		type: "String",
		required: true,
		trim: true,
	},
})

module.exports = mongoose.model("Song", songSchema) // instance of schema
