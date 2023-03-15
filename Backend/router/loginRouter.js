const express = require("express");
const { login } = require("../controller/registration-controller");

const router = express.Router();

router.post("/", login, (req, res, next) => {
    try {
        return res.send();
    } catch (error) {
        next(error);
    }
})

module.exports = router