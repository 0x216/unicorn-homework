const cors = require("cors");
const express = require("express");
require("express-async-errors");
const swaggerAutogen = require("swagger-autogen")();
const swaggerUi = require("swagger-ui-express");

const baseRoute = require("./src/routes/baseRoute");
const errorHandler = require("./src/middleware/errorHandlerMiddleware");
const sequelize = require("./src/database/controller");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", baseRoute);
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const doc = {
    info: {
      title: "Smokelass API",
      description: "API Description",
    },
    host: "localhost:8002",
    basePath: "/api/v1",
    schemes: ["http"],
  };

  const outputFile = "./swagger-schema.json";
  const endpointsFiles = ["./src/routes/baseRoute.js"];

  swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const swaggerDocument = require(outputFile);
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  });

  sequelize
    .authenticate()
    .then(() => console.log("Database connected."))
    .catch((err) => console.log("Error: " + err));
}

module.exports = app;
