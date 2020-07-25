const jwt = require("jsonwebtoken");
const User = require("../db/models/users");
const Auth = async (req, res, next) => {
    try {
        const token = req.header("auth-token").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({
            user_id: decoded.user_id,
            "tokens.token": token,
        });
        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: "Please Authenticate" });
    }
};

module.exports = Auth;
