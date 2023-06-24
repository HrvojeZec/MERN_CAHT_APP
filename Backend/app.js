const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const socket = require("socket.io");
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
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const server = app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        console.log("sendmsg: ", data);
        console.log(onlineUsers);
        const sendUserSocket = onlineUsers.get(data.to);
        console.log(sendUserSocket);
        if (sendUserSocket) {

            socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});

mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.wahxfqd.mongodb.net/mern-chat-app?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Database is connected");
    })
    .catch((err) => {
        console.log(err);
    });
