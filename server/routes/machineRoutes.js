const express = require("express");
const router = express.Router();
const { getMachines, bookMachine } = require("../controllers/machineController");
const auth = require("../middleware/auth");

router.get("/", getMachines);

router.post("/:id/book", auth, bookMachine);

module.exports = router;