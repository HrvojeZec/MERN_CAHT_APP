const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
        res.status(404).json({ message: "No token found" });
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid Token" });
        }
        req.id = user.id;
    })
    next();
}

const refreshToken = (req, res, next) => {
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

        const newToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "35s",
        })
        /*  console.log("Regenerated Token:\n", newToken); */
        res.cookie(String(user.id), newToken, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 35),
            httpOnly: true,
            sameSite: 'lax',
        })
        req.id = user.id;
    })

    next();
}
module.exports = { verifyToken, refreshToken }