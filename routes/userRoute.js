const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/login").post(userController.loginAPI);

router.route("/register").post(userController.registerAPI);

router.route("/user_info").get(userController.getUserInfoAPI);

router.route("/update_info").post(userController.updateInfoAPI);

module.exports = router;
