const Messages = require("../model/messageModel");


const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from
        })

        if (data) {
            return res.status(200).json({ message: "Message added succesfuly!" });
        } else {
            return res.status(400).json({ message: "Failed to add message!" });
        }
    } catch (error) {
        console.log(error);
    }

}

const getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to]
            }
        }).sort({
            updateAt: 1
        })
        const projectMessage = messages.map((msg) => {
            return {

                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            }

        })
        res.json(projectMessage);
    } catch (error) {
        console.log(error);
    }
}

module.exports = { addMessage, getAllMessage }
