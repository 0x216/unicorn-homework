const cors = require("cors");
const express = require("express");
require("express-async-errors");
const baseRoute = require("./src/routes/baseRoute");
const errorHandler = require("./src/middleware/errorHandlerMiddleware");
const sequelize = require("./src/database/controller");
const generateSwaggerDocumentation = require("./swagger");

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", baseRoute);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  generateSwaggerDocumentation(app);
  sequelize
    .authenticate()
    .then(() => console.log("Database connected."))
    .catch((err) => console.log("Error: " + err));
}

module.exports = app;
