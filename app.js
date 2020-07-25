const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user_route");
const customerRouter = require("./routes/customer_route");

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use(customerRouter);


module.exports = app;