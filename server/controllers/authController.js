const jwt = require("jsonwebtoken");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Registration
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!email.endsWith("@u.nus.edu")) {
            return res.status(400).json({ error: "Only NUS emails allowed (@u.nus.edu)" });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: "Email already registered" });
        }
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const tokenExpires = Date.now() + 3600000; // 1 hour

        user = new User({
            name,
            email,
            password,
            verificationToken,
            tokenExpires,
            isVerified: false
        });
        await user.save();

        // Send verification email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const verifyUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
        await transporter.sendMail({
            from: `"WaSh-it" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Verify your NUS Email",
            html: `<p>Click <a href="${verifyUrl}">here</a> to verify your email. This link expires in 1 hour.</p>`
        });

        res.status(201).json({ message: "Verification email sent. Please check your inbox." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Email Verification
const verifyEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const user = await User.findOne({
            verificationToken: token,
            tokenExpires: { $gt: Date.now() }
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired verification link." });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.tokenExpires = undefined;
        await user.save();
        res.json({ message: "Email verified successfully. You can now log in." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// Login (update to check isVerified)
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        if (!user.isVerified) {
            return res.status(401).json({ error: "Please verify your email before logging in." });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.json({ token, userId: user._id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { registerUser, verifyEmail, loginUser };