const { DataTypes } = require("sequelize");
const sequelize = require("../controller");
const Tracking = require("./tracking");

const Savings = sequelize.define(
  "Savings",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cigarettesPerDay: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cost: {
      type: DataTypes.FLOAT,
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

Savings.belongsTo(Tracking, {
  foreignKey: "trackingId",
  onDelete: "CASCADE",
});

Tracking.hasMany(Savings, {
  foreignKey: "trackingId",
});

module.exports = Savings;
