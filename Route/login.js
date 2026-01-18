const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/loginController");

//login route
router.post("/", handleLogin);

module.exports = router;
