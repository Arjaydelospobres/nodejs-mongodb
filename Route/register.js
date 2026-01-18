const express = require("express");
const router = express.Router();
const { handleNewUser } = require("../controllers/registerController");

// register route
router.post("/", handleNewUser);

module.exports = router;
