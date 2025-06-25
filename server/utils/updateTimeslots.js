const Machine = require("../models/Machine");

//TODO: adjust to timezone

//basic function for timeslot generation
const generateSlot = (startTime) => {
    const end = new Date(startTime.getTime() + 3600000); // 60 * 60 * 1000 milliseconds = 1 hour
    return {
        start: startTime,
        end,
        status: "available",
        bookedBy: null,
        waitlist: []
    };
};

const updateTimeslots = async () => {
    const machines = await Machine.find();

    let now = new Date();
    now.setMinutes(0, 0, 0);

    for (const machine of machines) {
        const slots = machine.timeslots;

        if (slots.length === 0) { //initialise the timeslots
            for (let i = 0; i < 13; i++) {
                slots.push(generateSlot(now));
                now = new Date(now.getTime() + 3600000);
            }
        } else if (slots.length === 13) {
            slots.shift();
            const startofNew = new Date(slots[slots.length - 1].end);
            slots.push(generateSlot(startofNew));
        } else {
            throw new Error("Database error: unexpected number of slots");
        }

        await machine.save();
    }
};

module.exports = updateTimeslots;