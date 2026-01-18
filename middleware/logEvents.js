const date = require("date-and-time");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logName) => {
  const dateTime = `${date.format(
    new Date(),
    "ddd, MMM DD YYYY hh:mm A [GMT]Z"
  )}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const reqlog = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, "Reqlog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { reqlog, logEvents };
