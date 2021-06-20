const UserController = require("../controllers/users")
const validateToken = require("../utils").validateToken

module.exports = (router) => {
	router.route("/user").post(UserController.add) // This route will be protected
	router.route("/login").post(UserController.login)
	// router.route("/logout").get(UserController.logout)
	router.route("/user").get(UserController.getAll)
}
