const mongoose = require("mongoose")

const TransactionSchema = mongoose.Schema({

    customer_id: { type: String, required: true},
    // transaction_id: {type: String, required: true},
    amount : {type: Number, required: true},
    transaction_type : {type:String, required: true},
    message : {type: String, required: false, default: ""}

}, { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model('transaction', TransactionSchema);