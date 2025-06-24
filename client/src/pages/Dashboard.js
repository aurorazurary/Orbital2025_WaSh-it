//backend connection
import api from "../api";

//frontend UI
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(true);

    //check login status
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    //fetch machince data
    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const response = await api.get('/machines');
                setMachines(response.data);
            } catch (err) {
                console.error('Failed to fetch machines:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMachines();
    }, []);

    //to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login'; // Force full page refresh
    };

    const navigate = useNavigate();

    return (
        <div>
            {isLoggedIn && (
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <button
                        onClick={handleLogout}
                        className="button"
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '0.9rem'
                        }}
                    >
                        Logout
                    </button>
                </div>
            )}

            <h1 className="important-text">Dashboard for Machines Availability</h1>
            {isLoggedIn ? (
                <>
                    <p className="normal-text">Welcome back! You can book a machine below:</p>
                    {loading ? (
                        <p className="normal-text">Loading machines...</p>
                    ) : (
                        <div className="floating-wrapper">
                            {machines.map((machine) => (
                                <div key={machine._id} className="floating-container dashboard flex">
                                    <div>
                                        <h3 className="important-text">{machine.type.toUpperCase()}</h3>
                                        <h4 className="normal-text">{machine.location}</h4>
                                        <p className="normal-text">
                                            Status: {machine.status.toUpperCase()}
                                            {machine.timeRemaining > 0 && ` (${machine.timeRemaining} mins)`}
                                        </p>
                                    </div>
                                    <button
                                        className={`button ${selectedMachine === machine._id ? 'selected' : ''}`}
                                        onClick={() => navigate(`/booking/${machine._id}`)}
                                    >
                                        {machine.status === 'available' ? 'BOOK NOW' : 'BOOK FOR LATER'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <p className="normal-text">Please log in to book a laundry machine.</p>
                    <Link to="/login" className="button normal-text bottomgap">Go to Login</Link>
                </>
            )}
        </div>
    )
}

export default Dashboard;
