const Tracking = require("../database/models/tracking");
const Savings = require("../database/models/savings");

exports.create = async (req, res) => {
  const { cigarettesPerDay, cost } = req.body;
  const { user } = req;
  try {
    const result = await sequelize.transaction(async (t) => {
      const existingTracking = await Tracking.findOne(
        { where: { userId: user.id } },
        { transaction: t }
      );
      if (existingTracking) {
        throw new Error("Tracking already exists");
      }
      const tracking = await Tracking.create(
        {
          userId: user.id,
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
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
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
