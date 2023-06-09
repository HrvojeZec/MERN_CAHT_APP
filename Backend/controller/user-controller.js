const User = require("../model/user");

const getUser = async (req, res, next) => {
    const userId = req.id;
    try {
        const findUser = await User.findById(userId, "-password");
        if (!findUser) {
            return res.status(404).json({ message: "User not found." });
        }
        return res.status(200).json({ findUser });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getAllUsers = async (req, res, next) => {

    try {
        const findUsers = await User.find();
        const users = findUsers.map(user => {
            return {
                username: user.username,
                id: user._id
            }
        });

        res.status(200).json({ users });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { getUser, getAllUsers }
