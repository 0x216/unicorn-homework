const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelizeConfig = {
  dialect: "postgres",
  models: [__dirname + "/models"],
  define: {
    timestamps: true,
    underscored: true,
  },
};

let sequelize;

if (process.env.NODE_ENV !== "test") {
  sequelize = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
      ...sequelizeConfig,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    }
  );
} else {
  sequelize = new Sequelize(
    process.env.POSTGRES_TEST_DB,
    process.env.POSTGRES_TEST_USER,
    process.env.POSTGRES_TEST_PASSWORD,
    {
      ...sequelizeConfig,
      host: process.env.DB_TEST_HOST,
      port: process.env.DB_TEST_PORT,
    }
  );
}

module.exports = sequelize;
