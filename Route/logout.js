const express = require("express");
const router = express.Router();
const { handleLogout } = require("../controllers/logoutController");

//logout route
router.get("/", handleLogout);

module.exports = router;
