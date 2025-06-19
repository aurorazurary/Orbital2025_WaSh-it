const express = require("express");
const router = express.Router();
const { getMachines, bookMachine, getMachineById } = require("../controllers/machineController");
const auth = require("../middleware/auth");

router.get("/", auth, getMachines);

router.get("/:id", auth, getMachineById);

router.post("/:id/book", auth, bookMachine);

module.exports = router;