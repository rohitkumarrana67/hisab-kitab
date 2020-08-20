const express = require("express");
const router = express.Router();
const userController = require("../v1/controllers/user_controller");
const Auth = require("../core/authenticator");
const { avatar, avatarError } = require("../core/utility_functions");

const User = require("../db/models/users");


router.post("/", userController.createNewUser);
router.post("/login", userController.login);
router.post('/logout', Auth, userController.logout);
router.get("/profile", Auth, userController.getProfile)
router.patch("/password", Auth, userController.updatePassword)
router.post("/avatar", Auth, avatar.single('upload'), userController.setAvatar, avatarError);
router.get("/avatar", Auth, userController.getAvatar);
router.patch("/", Auth, userController.update)

// router.get("/:id/avatar", async (req, res) => {
//     const user = await User.findOne({ user_id: req.params.id });
//     // console.log(user);
//     if (!user.avatar) {
//         res.status(404).send({ error: "image not found" });
//     } else {
//         res.set('Content-Type', 'image/jpg');
//         res.status(201).send(user.avatar);
//     }
// })
// router.get("/:userid",userController.readUser)
router.delete("/:user_id", Auth, userController.deleteUser)

module.exports = router;