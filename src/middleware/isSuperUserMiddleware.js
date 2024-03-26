
exports.isSuperuser = (req, res, next) => {
    if (!req.user) {
        return res.status(403).send({ message: 'Not authorized' });
    }

    if (!req.user.isSuperuser) {
        return res.status(403).send({ message: 'Requires superuser access' });
    }

    next();
}
