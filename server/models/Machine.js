const mongoose = require("mongoose");

const MachineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ["washer", "dryer"],
        required: true
    },
    status: {
        type: String,
        enum: ["available", "booked", "occupied"],
        default: "available"
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    bookedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Machine", MachineSchema);