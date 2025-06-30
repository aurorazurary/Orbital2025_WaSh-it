//backend connection
import api from "../api";

//frontend UI
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate();

    const handleSubmission = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in both fields");
            return;
        }

        try {
            const response = await api.post('/auth/login', {
                email,
                password
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.userId);

            setError("");
            navigation('/dashboard');

        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    };

    //TODO: remove the placeholders
    return (
        <div className="floating-container center">
            <p className="important-text">Login to WaSh-it</p>
            <form onSubmit={handleSubmission} className="login-form">
                {error && <p className="error-msg">{error}</p>}
                <label htmlFor="email">Email</label>
                <input
                    type="email" id="email" value={email} placeholder="test@u.nus.edu" onChange={(e) => setEmail(e.target.value)}
                    required/>
                <label htmlFor="password">Password</label>
                <input className="bottomgap" type="password" id="password" value={password} placeholder="IloveNUS." onChange={(e) => setPassword(e.target.value)}
                       required/>
                <button type="submit" className="button">
                    Log In
                </button>
            </form>
            <Link to="/register" className="normal-text topgap">Dont have an account? Register now!</Link>
        </div>
    );
}

export default Login;
