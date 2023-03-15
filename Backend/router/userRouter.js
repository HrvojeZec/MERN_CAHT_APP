const express = require("express");
const { verifyToken, refreshToken } = require("../controller/token-controller");
const { getUser, getAllUsers } = require("../controller/user-controller");


const router = express.Router();


router.get("/", refreshToken, verifyToken, getUser);
router.get("/all", refreshToken, verifyToken, getAllUsers);


module.exports = router