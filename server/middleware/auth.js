const jwt = require("jsonwebtoken");

const auth = async (req,  res, next) => {
    try {
        //get token from header
        const token = req.headers.authorization?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({ error: "No token, authorization denied"});
        }

        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ error: "Token is not valid" });
    }
};

module.exports = auth;