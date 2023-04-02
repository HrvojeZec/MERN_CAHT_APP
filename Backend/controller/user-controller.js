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
        return new Error(err)
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
        console.log(error);
    }
}

module.exports = { getUser, getAllUsers }
