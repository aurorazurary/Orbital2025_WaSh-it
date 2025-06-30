const Machine = require("../models/Machine");
const nodemailer = require("nodemailer");
const User = require("../models/User");

//get all machine ID
const getMachines = async (req, res) => {
    try {
        const machines = await Machine.find();
        // console.log("Machines fetched:", machines); //for debug
        res.json(machines);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

//POST to book a machine
const bookMachine = async (req, res) => {
    console.log("this is called")

    const { id } = req.params;
    const { timeslotId } = req.body;
    const userId = req.userId;

    console.log("Booking request received for machine ID:", id);
    console.log("User:", userId);
    console.log("Timeslot ID:", timeslotId);

    try {
        const machine = await Machine.findById(id);
        if (!machine) {
            return res.status(404).json({ error: "Machine not found" });
        }

        const timeslot = machine.timeslots.find(
            (slot) => slot._id.toString() === timeslotId
        );

        if (!timeslot) {
            return res.status(404).json({ error: "Timeslot not found"});
        }

        if (timeslot.status === "booked") {
            return res.status(400).json({ error: "Timeslot already booked, " +
                    "please refresh the page and see the availability of other slots"});
        }

        //machine booking
        timeslot.status = "booked";
        timeslot.bookedBy = userId;

        await machine.save();
        res.json(machine);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error, booking unsuccessful" });
    }
};

//get specific machine ID
const getMachineById = async (req, res) => {
    try {
        const machine = await Machine.findById(req.params.id);
        if (!machine) {
            return res.status(404).json({ error: "Machine not found" });
        }
        res.json(machine);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = { getMachines, bookMachine, getMachineById };