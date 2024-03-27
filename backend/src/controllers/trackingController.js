
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

exports.get = async (req, res) => {
    const {user} = req;
    try {
        const tracking = await Tracking.findOne({where : {userId: user.id}});
        if (!tracking) {
            return res.status(404).send({ message: 'Tracking not found' });
        }
        const savings = await Savings.findOne({where : {trackingId: tracking.id}});
        const trackingResponse = { ...tracking.get(), savings: savings.get() };
        res.send(trackingResponse);
    }
    catch {
        res.status(500).send({ message: error.message });
    }
}