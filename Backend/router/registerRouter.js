const express = require("express");
const { register } = require("../controller/registration-controller");

const router = express.Router();

router.post("/", register, (req, res, next) => {
    try {
        return res.send();
    } catch (error) {
        next(error)
    }
});

module.exports = router