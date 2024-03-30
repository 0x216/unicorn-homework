const { DataTypes } = require("sequelize");
const sequelize = require("../controller");

const Savings = sequelize.define(
  "Savings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    days: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cigarettesPerDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trackingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trackings",
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "savings",
  }
);

module.exports = Savings;
