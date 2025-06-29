import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function VerifyEmail() {
    const { token } = useParams();
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const verify = async () => {
            try {
                const res = await api.get(`/auth/verify-email/${token}`);
                setMessage(res.data.message);
            } catch (err) {
                setError(err.response?.data?.error || "Verification failed");
            }
        };
        verify();
    }, [token]);

    return (
        <div className="floating-container center">
            <h2 className="important-text">Email Verification</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p className="error-msg">{error}</p>}
            <Link to="/login" className="button">Go to Login</Link>
        </div>
    );
}

export default VerifyEmail;