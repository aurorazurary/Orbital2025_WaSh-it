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
    const [selected, setSelected] = useState(null)
    const [confirm, setConfirm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [warning, setWarning] = useState(null);
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
        if (!selected) {
            setWarning("Please select a time slot first");
            return;
        }

        setWarning("");
        setConfirm(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <div className="floating-wrapper bottomgap">
                <div className="floating-container machine-info important-text center">
                    Location: {machine.location} <br />
                    Type: {machine.type} <br/>
                    Number: {machine.number} <br/>
                </div>
                <div className="floating-container timeslots">
                    <div className="timeslot-container">
                        {timeslots.slice(1).map((timeslot) => (
                            <button key={timeslot._id}
                                    onClick={() => setSelected(timeslot)}
                                    disabled={timeslot.status != "available"}
                                    className={`button timeslot bottomgap ${
                                        selected && selected._id === timeslot._id ? "selected" : ""
                                    }`}
                            >
                                <p className="normal-text">
                                    {convertDatetoText(timeslot.start)}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="center">
                {warning && <p className="error-msg">{warning}</p>}
                <button
                    onClick={handleBooking}
                    className="button">
                    Book now
                </button>
            </div>
            {confirm && (
                <div className="popup-window">
                    <p className="normal-text">
                        Please confirm your booking: <br/>
                        Location: {machine.location} <br/>
                        Type: {machine.type} <br/>
                        Number: {machine.number} <br/>
                        Timeslot:
                        <strong>{convertDatetoText(selected.start)}</strong>
                    </p>
                    <button onClick={() => setConfirm(false)}
                            className="button"
                    >
                        Cancel
                    </button>
                    <button onClick={async () => {
                        setConfirm(false);

                        await api.post(`/machines/${machineId}/book`, {
                            timeslotId: selected._id
                        });

                        alert("Booking successful!");
                        window.location.reload();
                    }} className="button selected">
                        Confirm
                    </button>
                </div>
            )}
        </div>
    )
}

export default Booking;