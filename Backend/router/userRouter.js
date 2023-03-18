const express = require("express");
const { verifyToken, refreshToken } = require("../controller/token-controller");
const { getUser, getAllUsers } = require("../controller/user-controller");


const router = express.Router();


router.get("/refreshToken", refreshToken, verifyToken, getUser);
router.get("/", verifyToken, getUser);
router.get("/all", verifyToken, getAllUsers);


module.exports = router