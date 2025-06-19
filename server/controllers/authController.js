const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return res.status(401).json({error: "Invalid credentials no user found, please register later"});
        }

        //verify password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({error: "Invalid credentials as your password doesnt match"});
        }

        //create JWT token
        const token = jwt.sign(
            {userId: user._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        res.json({token, userId: user._id});
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error"});
    }
};

module.exports = { loginUser };