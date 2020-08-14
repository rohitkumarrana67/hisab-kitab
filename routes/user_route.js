const express = require("express");
const router = express.Router();
const userController = require("../v1/controllers/user_controller");
const Auth = require("../core/authenticator");
const { avatar, avatarError } = require("../core/utility_functions");


router.post("/", userController.createNewUser);
router.post("/login", userController.login);
router.post('/logout', Auth, userController.logout);
router.get("/profile", Auth, userController.getProfile)
router.post("/avatar", Auth, avatar.single('upload'), userController.setAvatar, avatarError);
router.patch("/update",Auth, userController.update)
// router.get("/:userid",userController.readUser)
// router.delete("/:userid",userController.deleteUser)

module.exports = router;