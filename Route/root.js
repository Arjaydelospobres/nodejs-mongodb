const express = require("express");
const router = express.Router();
const path = require("path");

// index page : localhost:3700/index
router.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile("../views/index.html");
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

// new page : localhost:3700/new-page
router.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "new-page.html"));
});

// old page : localhost:3700/old-page
router.get("/old-page(.html)?", (req, res) => {
  res.redirect("new-page.html");
});

module.exports = router;
