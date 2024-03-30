require("dotenv").config();

function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(409).send({ message: "Email already in use." });
  }
  if (err.type === "TrackingExistsError") {
    return res.status(409).send({ message: err.message });
  }

  if (process.env.NODE_ENV === "test") {
    return res.status(500).send({ error: err, message: err.message });
  }

  return res.status(500).send({ message: "An unexpected error occurred." });
}

module.exports = errorHandler;
