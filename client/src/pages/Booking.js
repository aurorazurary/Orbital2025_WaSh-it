import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

function Booking() {
    console.log("Booking page rendered"); //for debug
    const {machineId} = useParams();
    const [machine, setMachine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchMachine = async () => {
            try {
                const response = await api.get(`/machines/${machineId}`);
                setMachine(response.data);
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
    const handleBooking = async ()=>{};

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    //TODO: complete the html design with time slot shown
    return (
        <div className = "floating-container">
            <h1>{machine.name}</h1>
            <h1>{machine.location}</h1>
            <h1>{machine.type}</h1>
            <button
                onClick={handleBooking}
                disabled={machine.status !== "available"}
                className="button">
                {machine.status === "available" ? "Book now" : "Unavailable"}
            </button>
        </div>
    )
}

export default Booking;