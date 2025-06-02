//backend connection
import api from "../api";

//frontend UI
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

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

    const handleBook = async (machineId) => {
        try {
            setSelectedMachine(machineId);
            const response = await api.post(`/machines/${machineId}/book`);
            setMachines(machines.map(m =>
                m._id === response.data._id ? response.data : m
            ));
        } catch (err) {
            setSelectedMachine(null); //reset if run into error
            alert(err.response?.data?.error || 'Booking failed');
        }
    };

    //to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        window.location.href = '/login'; // Force full page refresh
    };


    //TODO: navigate to new page to check existing bookings for available machines and allow use to choose specific time slots
    //TODO: For occupied machines also allow to book in future available slots
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
                        <div className="machine-list">
                            {machines.map((machine) => (
                                <div key={machine._id} className="machine">
                                    <div>
                                        <h3 className="important-text">{machine.name}</h3>
                                        <p className="normal-text">
                                            Status: {machine.status.toUpperCase()}
                                            {machine.timeRemaining > 0 && ` (${machine.timeRemaining} mins)`}
                                        </p>
                                    </div>
                                    <button
                                        className={`button ${selectedMachine === machine._id ? 'selected' : ''}`}
                                        onClick={() => handleBook(machine._id)}
                                        disabled={machine.status !== 'available'}
                                    >
                                        {machine.status === 'available' ? 'BOOK NOW' : machine.status.toUpperCase()}
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
