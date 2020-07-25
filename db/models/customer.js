const mongoose = require("mongoose");
const validator = require('validator')


const CustomerSchema = mongoose.Schema({

    owner_id: { type: String },
    customer_id: { type: String, required: true },
    customer_name: { type: String, required: true },
    mobile_number: [],
    address: { type: String },
    email: {
        type: String, unique: true, trim: true, lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email not Valid")
            }
        }
    },

}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model('customer', CustomerSchema);