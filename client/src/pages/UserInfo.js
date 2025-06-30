//backend connection
import api from "../api";

//frontend UI
import {useEffect, useState} from "react";

function convertDatetoText(date) {
    const hour = new Date(date).getHours();
    const startHour = hour.toString().padStart(2, '0');
    const endHour = ((hour + 1) % 24).toString().padStart(2, '0');
    return `${startHour}:00 - ${endHour}:00`
}

function UserInfo() {
    const [user, setUser] = useState(null);
    const [nextBooking, setNextBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await api.get("/users/me");
                const userData = res.data;
                setUser(userData);

                const now = new Date();
                const upcoming = userData.bookings
                    .filter(b => new Date(b.start) > now)
                    .sort((a, b) => new Date(a.start) - new Date(b.start))[0];

                setNextBooking(upcoming);
            } catch (err) {
                setError("Failed to load user info");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []); if (loading) return <p>Loading user info...</p>;
    if (error) return <p className="error-msg">{error}</p>;

    return (
        <div className="floating-wrapper">
            <div className="floating-container important-text center">
                <h2>Hello, {user.name} 👋</h2>
                <p>Email: {user.email}</p>
            </div>

            <div className="floating-container center">
                <h3 className="important-text">📅 Next Booking</h3>
                {nextBooking ? (
                    <div className="normal-text">
                        <p>Location: {nextBooking.machine.location}</p>
                        <p>Type: {nextBooking.machine.type}</p>
                        <p>Number: {nextBooking.machine.number}</p>
                        <p>Time: {convertDatetoText(nextBooking.start)}</p>
                    </div>
                ) : (
                    <p  className="normal-text">No upcoming bookings</p>
                )}
            </div>
        </div>
    );
}

export default UserInfo;