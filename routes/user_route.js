const express = require("express");
const router = express.Router();
const userController = require("../v1/controllers/user_controller");
const Auth = require("../core/authenticator");

router.post("/", userController.createNewUser);
router.post("/login", userController.login);
router.get("/profile", Auth, userController.getProfile)
// router.patch("/",userController.updateUser)
// router.get("/:userid",userController.readUser)
// router.delete("/:userid",userController.deleteUser)

module.exports = router;