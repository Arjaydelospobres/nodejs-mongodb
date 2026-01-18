const { logEvents } = require("./logEvents");

const errorHandler = (err, req, res, next) => {
  logEvents(`${err.name}\t${err.message}`, "Error_Log.txt");
  console.error(err.stack);
  res.status(500).send(err.message);
};

module.exports = errorHandler;
