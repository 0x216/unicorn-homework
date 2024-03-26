const { verifyToken } = require('../utils/jwtUtils');

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(403).send({ message: 'No token provided' });
        }

        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Unauthorized: Invalid token' });
    }
};
