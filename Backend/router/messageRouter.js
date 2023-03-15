const express = require("express");
const { addMessage, getAllMessage } = require("../controller/message-controller");

const router = express.Router();

router.post("/addmsg", addMessage, (req, res, next) => {
    try {
        return res.send();
    } catch (error) {
        next(error)
    }
});

router.get("/getmsg", async (req, res, next) => {
    try {
        try {
            const response = await getAllMessage();
            return res.json(response);
        } catch (err) {
            next(err);
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router