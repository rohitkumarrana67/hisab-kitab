const mongoose = require("mongoose");
const mongoDB_url = process.env.MONGODB_URL;
const dbConnect = () => {

    mongoose.connect(mongoDB_url, {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
        useFindAndModify: false,
    })
    mongoose.connection.on("connected", () => {
        console.log("Succesfully connected to Database")
    })

    mongoose.connection.on("disconnected", () => {
        console.log("Could not connect to the database ");
        process.exit();
    })

    mongoose.connection.on("error", () => {
        console.log("Error in Connecting to Database");
        process.exit(1)
    })
};


module.exports = {
    dbConnect
}