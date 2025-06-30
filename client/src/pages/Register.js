import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");
        if (!name || !email || !password || !confirmPassword) {
            setError("Please fill in all fields");
            return;
        }
        if (!email.endsWith("@u.nus.edu")) {
            setError("Only NUS emails allowed (@u.nus.edu)");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const res = await api.post("/auth/register", { name, email, password });
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.error || "Registration failed");
        }
    };

    return (
        <div className="floating-container center">
            <h2 className="important-text">Register for WaSh-it</h2>
            <form onSubmit={handleSubmit} className="login-form">
                {error && <p className="error-msg">{error}</p>}
                {message && <p style={{ color: "green" }}>{message}</p>}
                <label className="normal-text">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <label className="normal-text">NUS Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <label className="normal-text">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <label className="normal-text">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <button type="submit" className="button topgap">Register</button>
            </form>
        </div>
    );
}

export default Register;