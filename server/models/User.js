const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: { //only nus email
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minlength: 6
    },
    bookings: [
        {
            machine: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Machine",
                required: true
            },
            timeslotId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            start: {
                type: Date,
                required: true
            }
        }
    ],
    verificationToken: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    tokenExpires: {
        type: Date,
    },
});

//hash password using bcrypt
UserSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    // console.log("Hashing password:", this.password)
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

//to compare password for login
UserSchema.methods.comparePassword = async function (keyedInPassword) {
    console.log("Entered password:", keyedInPassword);
    console.log("Stored hashed password:", this.password);
    return await bcrypt.compare(keyedInPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema)