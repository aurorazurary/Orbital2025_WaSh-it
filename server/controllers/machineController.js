const Machine = require("../models/Machine");

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
    const { id } = req.params;
    const userId = req.userId;

    try {
        const machine = await Machine.findById(id);
        if (!machine) {
            return res.status(404).json({ error: "Machine not found" });
        }

        //check availability
        if (machine.status !== "available") {
            return res.status(400).json({ error: "Machine is not available" });
        }

        //machine booking
        machine.status = "booked";
        machine.bookedBy = userId;
        machine.bookedAt = new Date();
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