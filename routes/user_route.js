const express = require("express");
const router = express.Router();
const userController = require("../v1/controllers/user_controller");

router.get("/", userController.create);





module.exports = router;