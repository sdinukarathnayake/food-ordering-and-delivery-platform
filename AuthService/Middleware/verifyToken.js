const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    let token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log("token verified done") //debugging
        next();
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            console.log("Access token has expired!");
        } else {
            console.error("Token verification failed:", err.message);
        }
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;
