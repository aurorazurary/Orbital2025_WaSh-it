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
        //this is for notification
        try {
            // Find the just-booked timeslot
            const bookedTimeslot = machine.timeslots.find(
                (slot) => slot._id.toString() === timeslotId
            );
            if (bookedTimeslot && bookedTimeslot.bookedBy) {
                const user = await User.findById(bookedTimeslot.bookedBy);
                if (user && user.email) {
                    const endTime = new Date(bookedTimeslot.end);
                    const now = new Date();
                    const delay = endTime.getTime() - now.getTime();

                    if (delay > 0) {
                        setTimeout(async () => {
                            try {
                                const transporter = nodemailer.createTransport({
                                    service: "gmail",
                                    auth: {
                                        user: process.env.EMAIL_USER,
                                        pass: process.env.EMAIL_PASS
                                    }
                                });
                                await transporter.sendMail({
                                    from: `"WaSh-it" <${process.env.EMAIL_USER}>`,
                                    to: user.email,
                                    subject: "Your laundry is done!",
                                    html: `<p>Your laundry cycle for machine <b>${machine.type}</b> at <b>${machine.location}</b> (number <b>${machine.number}</b>) is complete. Please collect your laundry.</p>`
                                });
                                console.log(`Notification sent to ${user.email} for machine ${machine._id}`);
                            } catch (mailErr) {
                                console.error("Failed to send notification email:", mailErr);
                            }
                        }, delay);
                    }
                }
            }
        } catch (notifyErr) {
            console.error("Notification scheduling error:", notifyErr);
        }

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