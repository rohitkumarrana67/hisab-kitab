const express = require("express");
require("dotenv").config();
const userRouter = require("./routes/user_route");

const app = express();

app.use(express.json());



app.use("/users/", userRouter);


module.exports = app;