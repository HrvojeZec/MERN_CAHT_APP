const User = require("../model/user");
const bcryprt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require('joi');

const register = async (req, res, next) => {

    try {
        const { username, email, password, confirmPassword } = req.body;
        const schema = Joi.object({
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            confirmPassword: Joi.string().required(),
        });

        const { error } = schema.validate(req.body);
        if (error) {
            const emailError = error.details.find((e) => e.path[0] === "email");
            if (emailError) {
                return res.status(400).json({ messageEmail: "Please provide a valid email address." });
            }
        }

        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.status(400).json({ messageUsername: "Username already exists! Try another one." });
        }


        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.status(400).json({ messageEmail: "Email already used!" });
        }

        const hashedPassword = await bcryprt.hash(password, 10);
        if (password != confirmPassword) {
            return res.status(400).json({ messagePassword: "Passwords needs to be the same" })
        }

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        })
        return res.json({ user })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res, next) => {

    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            return res.status(400).json({ messageUsername: "Incorrect username!" });
        }

        const isPasswordCorrect = bcryprt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ messagePassword: "Incorrect password!" });
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "35s",
        })

        if (req.cookies[`${existingUser._id}`]) {
            req.cookies[`${existingUser._id}`] = "";
        }
        res.cookie(String(existingUser._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax',
        })

        return res.status(200).json({ existingUser, message: "Successfully Logged In", token });
    } catch (error) {
        console.log(error);
    }
}

const logout = async (req, res, next) => {
    const cookies = req.headers.cookie;

    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Authentication failed" });
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        return res.status(200).json({ message: "successfully logout" })
    })


}

module.exports = { register, login, logout }
