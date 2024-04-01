const Tracking = require("../database/models/tracking");
const Savings = require("../database/models/savings");
const sequelize = require("../database/controller");

exports.create = async (req, res) => {
  /*  #swagger.tags = ['Tracking']
      #swagger.description = 'Endpoint to start new tracking.'
      #swagger.parameters['obj'] = {
            in: 'body',
            description: 'Information about daily cigarette consumption and cost.',
            schema: { $ref: "#/definitions/CreateTrackingRequest" }
      }
      #swagger.responses[201] = { 
            description: "Tracking created successfully.",
            schema: { $ref: "#/definitions/TrackingResponse" }
      }
      #swagger.responses[400] = { description: "Tracking already exists" }
      #swagger.responses[500] = { description: "Internal server error." }
  */
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

exports.delete = async (req, res) => {
  /*  #swagger.tags = ['Tracking']
      #swagger.description = 'Endpoint to delete tracking.'
      #swagger.responses[200] = { description: "Tracking deleted successfully." }
      #swagger.responses[404] = { description: "Tracking not found." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
  const { user } = req;

  const tracking = await Tracking.findOne({ where: { userId: user.id } });
  if (!tracking) {
    return res.status(404).send({ message: "Tracking not found" });
  }
  await tracking.destroy();
  res.send({ message: "Tracking deleted successfully" });
};

exports.get = async (req, res) => {
  /*  #swagger.tags = ['Tracking']
      #swagger.description = 'Endpoint to get info about tracking.'
      #swagger.responses[200] = { 
            description: "Tracking info retrieved successfully.",
            schema: { $ref: "#/definitions/TrackingResponse" }
      }
      #swagger.responses[404] = { description: "Tracking or savings not found." }
      #swagger.responses[500] = { description: "Internal server error." }
  */
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
