import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigation = useNavigate();

    const handleSubmission = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in both fields");
            return;
        }

        //TODO: Check with actual API call to verify
        if (email === "test@u.nus.edu" && password === "IloveNUS.") {
            setError("");
            localStorage.setItem("isLoggedIn", "true"); //to record login status
            navigation("/dashboard"); //direct to dashboard on success
        } else {
            setError("Invalid email or password")
        }
    };

    //TODO: remove the placeholders
    return (
        <div className="container center">
            <h1>Login to WaSh-it</h1>
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
        </div>
    );
}

export default Login;
