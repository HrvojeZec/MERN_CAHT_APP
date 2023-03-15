const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const registerRouter = require("./router/registerRouter");
const loginRouter = require("./router/loginRouter");
const userRouter = require("./router/userRouter");
const refreshToken = require("./router/userRouter");
const messageRouter = require("./router/messageRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/user", userRouter);
app.use("/api/refreshToken", refreshToken);
app.use("/api/message", messageRouter);

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.wahxfqd.mongodb.net/mern-chat-app?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000);
        console.log("database is connected");
    }).catch((err) => {
        console.log(err);
    })




