import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../api";

function convertDatetoText(date) {
    const hour = new Date(date).getHours();
    const startHour = hour.toString().padStart(2, '0');
    const endHour = ((hour + 1) % 24).toString().padStart(2, '0');
    const timeText = `${startHour}:00 - ${endHour}:00`;
    return timeText;
}

function Booking() {
    console.log("Booking page rendered"); //for debug
    const {machineId} = useParams();
    const [machine, setMachine] = useState(null);
    const [timeslots, setTimeslots] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMachine = async () => {
            try {
                const response = await api.get(`/machines/${machineId}`);
                setMachine(response.data);
                setTimeslots(response.data.timeslots)
                console.log("Machine data:", response.data); //for debug
            } catch (err) {
                setError("Machine not found")
            } finally {
                setLoading(false);
            }
        };
        fetchMachine();
    }, [machineId]);

    //TODO: complete the function writing
    const handleBooking = async () => {
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="floating-wrapper bottomgap">
                <div className="floating-container machine-info">
                    <p className="important-text">{machine.name}</p>
                    <p className="normal-text">{machine.location}</p>
                    <p className="normal-text">{machine.type}</p>
                </div>
                <div className="floating-container timeslots">
                    <div className="timeslot-container">
                        {timeslots.map((timeslot) => (
                            <button key={timeslot._id} className="button timeslot bottomgap">
                                <p className="normal-text">
                                    {convertDatetoText(timeslot.start)}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="center">
                <button
                    onClick={handleBooking}
                    disabled={machine.status !== "available"}
                    className="button">
                    {machine.status === "available" ? "Book now" : "Unavailable"}
                </button>
            </div>
        </div>
    )
}

export default Booking;