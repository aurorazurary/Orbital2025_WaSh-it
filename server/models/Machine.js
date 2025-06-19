const mongoose = require("mongoose");

const BookingTimeSlotsSchema = new mongoose.Schema({
    start: {type: Date, required: true},
    end: {type:Date, required: true},
    status: {
        type: String,
        enum: ["available", "booked"],
        default: "available"
    },
    bookedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    waitlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }]
});

const MachineSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["washer", "dryer"],
        required: true
    },
    number: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["available", "occupied"],
        default: "available"
    },
    timeslots: [BookingTimeSlotsSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model("Machine", MachineSchema);