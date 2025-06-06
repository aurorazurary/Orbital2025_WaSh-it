//Main entry point
require('dotenv').config(); //reads .env file
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const machineRoutes = require("./routes/machineRoutes");

//initialise Express application
const app = express();

//set up middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
});

//connect database
connectDB();

//handle routes
app.use("/api/auth", authRoutes);
app.use("/api/machines", machineRoutes);

//handle 404 error
app.use((req, res, next) => {
    res.status(404).json({error: "Route not found"});
});

//handle error
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong."})
});

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


