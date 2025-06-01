import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedInStatus === "true");
    }, []);

    //TODO: link to actual API calls
    const [machines, setMachines] = useState([
        {id: 1, name: 'Washer #1', status: 'available', timeRemaining: 0},
        {id: 2, name: 'Washer #2', status: 'occupied', timeRemaining: 25},
        {id: 3, name: 'Dryer #1', status: 'available', timeRemaining: 0},
    ]);
    const [selectedMachine, setSelectedMachine] = useState(null);
    const handleBook = (id) => {
        setMachines(machines.map(machine =>
            machine.id === id ? {...machine, status: 'booked'} : machine
        ));
        setSelectedMachine(id);
    };

    //TODO: navigate to new page to check existing bookings for available machines and allow use to choose specific time slots
    //TODO: For occupied machines also allow to book in future available slots
    return (
        <div>
            <h1 className="important-text">Dashboard for Machines Availability</h1>
            {isLoggedIn ? (
                <>
                    <p className="normal-text">Welcome back! You can book a machine below:</p>
                    <div className="machine-list">
                        {machines.map((machine) => (
                            <div key={machine.id} className="machine">
                                <div>
                                    <h3 className="important-text">{machine.name}</h3>
                                    <p className="normal-text">
                                        Status: {machine.status.toUpperCase()}
                                        {machine.timeRemaining > 0 && ` (${machine.timeRemaining} mins)`}
                                    </p>
                                </div>
                                <button
                                    className={`button ${selectedMachine === machine.id ? 'selected' : ''}`}
                                    onClick={() => handleBook(machine.id)}
                                    disabled={machine.status !== 'available'}
                                >
                                    {machine.status === 'available' ? 'BOOK NOW' : machine.status.toUpperCase()}
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <p className="normal-text">Please log in to book a laundry machine.</p>
                    <Link to="/login" className="button normal-text bottomgap">Go to Login</Link>
                </>
            )}
        </div>
    );
}

export default Dashboard;
