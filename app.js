const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const authenticator = require("./core/authenticator")
const userRouter = require("./routes/user_route");
const customerRouter = require("./routes/customer_route");
const transactionRouter = require("./routes/transaction_route");

const app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.json());

app.use("/users", userRouter);
app.use(customerRouter);
// app.use(authenticator);
app.use(transactionRouter);
app.use(express.static(__dirname + "/public"));

module.exports = app;