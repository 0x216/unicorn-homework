
const Tracking = require('../database/models/tracking');
const Savings = require('../database/models/savings');

exports.create = async (req, res) => {
    const { cigarettesPerDay, cost } = req.body;
    const {user} = req;
    try {
        const existingTracking = await Tracking.findOne({ where: { userId: user.id } });
        if (existingTracking) {
            return res.status(409).send({ message: 'Tracking already exists' });
        }
        const tracking = await Tracking.create({
            userId: user.id,
        });
        
        const savings = await Savings.create({
            trackingId: tracking.id,
            cigarettesPerDay,
            cost
        });
        
        const trackingResponse = { ...tracking.get(), savings: savings.get() };
        
        res.status(201).send(trackingResponse);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}