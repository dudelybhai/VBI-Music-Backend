require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const logger = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
app.use(cors())
const router = express.Router()

const environment = process.env.NODE_ENV
const stage = require("./config")[environment]

const routes = require("./routes/index.js")

// app.use(
// 	bodyParser.urlencoded({
// 		extended: true,
// 	})
// )
// app.use(bodyParser.json())

app.use(express.json())

if (environment !== "production") {
	app.use(logger("dev"))
}

// view engine setup
// app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use("/api/v1", routes(router))
app.use("/api/v1", (req, res, next) => {
	res.render("landing")
	next()
})
app.use("/", (req, res, next) => {
	res.status("404").json({ message: "Not found" })
})

var db = mongoose.connect(
	process.env.MONGO_LOCAL_CONN_URL,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	function (error) {
		if (error) console.log(error)

		console.log("DB connection successful")
	}
)

app.listen(`${stage.port}`, () => {
	console.log(`Server now listening at localhost:${stage.port}`)
})

module.exports = app
