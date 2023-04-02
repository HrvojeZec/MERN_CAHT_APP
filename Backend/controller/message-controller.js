const Messages = require("../model/messageModel");


const addMessage = async (req, res, next) => {
    console.log("body: ", req.body);
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
    console.log("getmsb: ", req.body);
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: {
                $all: [from, to]
            }
        }).sort({
            updatedAt: 1
        })
        console.log("messages: ", messages);
        const projectMessage = messages.map((msg) => {

            return {

                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                id: msg._id
            }

        })
        res.json(projectMessage);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { addMessage, getAllMessage }
