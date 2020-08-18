const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const { unauthorizedError } = require("../../core/utility_functions");
const jwt = require("jsonwebtoken");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email not Valid")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
    },
    mobile_number: {
        type: Number
    },
    address: {
        type: String
    },
    avatar: {
        type: Buffer
    },
    tokens: [{
        type: String,
        required: true
    }]
}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });


UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET);
    user.tokens = await user.tokens.concat(token);
    await user.save();
    return token;
};

UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw unauthorizedError("unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw unauthorizedError("unable to login");
    }
    return user;
};


UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next();
});

const User = mongoose.model('Users', UserSchema);
module.exports = User;
