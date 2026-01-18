require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const configDB = require("./config/configDB");
const cookieParser = require("cookie-parser");
const { reqlog } = require("./middleware/logEvents");
const credentials = require("./middleware/credentials");
const errorHandler = require("./middleware/errorHandler");
const root = require("./Route/root");
const subdir = require("./Route/subdir");
const persondata = require("./Route/api/persondata");
const register = require("./Route/register");
const loginAuth = require("./Route/login");
const refresh = require("./Route/refresh");
const logout = require("./Route/logout.js");
const { corsOptions } = require("./config/corsOptions");
const verifyJWT = require("./middleware/verifyJWT");
// const { setUncaughtExceptionCaptureCallback } = require("process");

const PORT = process.env.PORT || 3700;
const app = express();

// connect to mongodb
configDB();

//middleware path and save log data
app.use(reqlog);

//
app.use(credentials);

app.use(cors(corsOptions));

//middleware to handle urlencoded data
app.use(express.urlencoded({ extended: false }));

//middleware json
app.use(express.json());

//middleware cookies
app.use(cookieParser());

//css file design
app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/subdir", express.static(path.join(__dirname, "/public")));

//sub-directory router
app.use("/", root);

//all root files router
app.use("/subdir", subdir);
// api for register
app.use("/register", register);

// api for user Authentication
app.use("/auth", loginAuth);

// refresh token
app.use("/refresh", refresh);

// api for logout refresh token
app.use("/logout", logout);

//api for person data
app.use(verifyJWT);
app.use("/person", persondata);

// error page
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: " 404 not found" });
  } else {
    res.type(txt).send(" 404 not found");
  }
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
