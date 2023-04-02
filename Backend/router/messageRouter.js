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

router.post("/getmsg", getAllMessage);

module.exports = router