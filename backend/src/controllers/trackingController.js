const Tracking = require("../database/models/tracking");
const Savings = require("../database/models/savings");
const sequelize = require("../database/controller");

exports.create = async (req, res) => {
  const { cigarettesPerDay, cost } = req.validatedBody;
  const userId = req.user.id;
  const result = await sequelize.transaction(async (t) => {
    const existingTracking = await Tracking.findOne(
      { where: { userId: userId } },
      { transaction: t }
    );
    if (existingTracking) {
      const error = new Error("Tracking already exists");
      error.type = "TrackingExistsError";
      throw error;
    }
    const tracking = await Tracking.create(
      {
        userId: userId,
      },
      { transaction: t }
    );

    const savings = await Savings.create(
      {
        trackingId: tracking.id,
        cigarettesPerDay,
        cost,
      },
      { transaction: t }
    );

    return { ...tracking.get(), savings: savings.get() };
  });
  res.status(201).send(result);
};

exports.get = async (req, res) => {
  const { user } = req;
  try {
    const tracking = await Tracking.findOne({ where: { userId: user.id } });
    if (!tracking) {
      return res.status(404).send({ message: "Tracking not found" });
    }
    const savings = await Savings.findOne({
      where: { trackingId: tracking.id },
    });
    if (!savings) {
      return res
        .status(404)
        .send({ message: "Savings not found for the tracking record" });
    }
    const trackingResponse = { ...tracking.get(), savings: savings.get() };
    res.send(trackingResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
