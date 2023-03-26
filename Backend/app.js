const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
require('dotenv').config();

const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const messageRouter = require("./router/messageRouter");

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth/", authRouter);
app.use("/api/auth/", authRouter);
app.use("/api/auth/", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.wahxfqd.mongodb.net/mern-chat-app?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000);
        console.log("database is connected");
    }).catch((err) => {
        console.log(err);
    })




