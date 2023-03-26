const express = require("express");
const { login, logout, register } = require("../controller/registration-controller");
const { verifyToken } = require("../controller/token-controller");
const router = express.Router();

router.post("/login", login, (req, res, next) => {
    try {
        return res.send();
    } catch (error) {
        next(error);
    }
})

router.post("/logout", verifyToken, logout, (req, res, next) => {
    try {
        return res.send();
    } catch (error) {
        next(error);
    }
})


router.post("/register", register, (req, res, next) => {
    try {
        return res.send();
    } catch (error) {
        next(error)
    }
});
module.exports = router