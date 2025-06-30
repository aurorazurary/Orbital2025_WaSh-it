import {Link} from 'react-router-dom'
import {useState, useEffect} from "react";

function Main() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //check login status
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    return (
        <>
            <div className="container center">
                <h1 className="important-text"> Welcome to WaSh-it! </h1>
                <h2 className="normal-text bottomgap"> Your fuss-free laundry booking system</h2>
                {isLoggedIn ?
                    <Link to="/userinfo" className="button normal-text bottomgap">Info Page</Link>
                    :
                    <>
                        <Link to="/register" className="button normal-text bottomgap">Register</Link>
                        <Link to="/login" className="button normal-text bottomgap">Go to Login</Link>
                    </>
                }
                <Link to="/dashboard" className="button normal-text">Go to Dashboard</Link>
            </div>

            <div className="container">
                <h1 className="important-text"> User Stories </h1>
                <p>- As a dormitory resident who wants to do laundry, I want to be able to check machine availability
                    before carrying my laundry, so that I don’t waste time and effort.</p>
                <p>- As a NUS student and dormitory resident who is incredibly busy and wants to avoid waiting, I
                    want to book a laundry machine in advance so that I can plan my time efficiently.</p>

                <p>- As a resident who has a booking, I want to be able to receive a notification when my laundry
                    slot is about to start or end so that I don’t forget my laundry.</p>

                <p> - As a dormitory administrator, I want to monitor machine usage for each individual(and also
                    the general population) and detect potential misuse so that the laundry system remains fair for
                    all residents.</p>
            </div>

            <div className="container">
                <h1 className="normal-text">
                    Found out more about us at{" "}
                    <a href="https://github.com/aurorazurary/Orbital2025_WaSh-it">Github</a>
                </h1>
            </div>
        </>
    )
}

export default Main;