const bcrypt = require('bcrypt');
const User = require('../database/models/user');
const { hashPassword, validatePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/jwtUtils');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid password' });
        }

        const token = generateToken(user);
        res.send({ token });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};


exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(409).send({ message: 'Email already in use.' });
    }

    if (!validatePassword(password))
        return res.status(400).send({ message: 'Password does not meet the security requirements.' });

    try {
        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        const userResponse = { ...user.get(), password: undefined };
        res.status(201).send(userResponse);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).send({ message: 'Email already in use.' });
        }
        res.status(500).send({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const { name, email } = req.body;
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        user.name = name;
        user.email = email;
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        if (req.user.isSuperuser) {
            await user.destroy();
            res.send({ message: 'User deleted successfully' });
        } else {
            res.status(403).send({ message: 'Not authorized' });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getMe = async (req, res) => {
    try {
        if (!req.user)
            return res.status(404).send({ message: 'User not found' });

        const user = await User.findByPk(req.user.id);
        if (!user)
            return res.status(404).send({ message: 'User not found' });

        // exclude password and isSuperuser flag
        const { password, isSuperuser, ...userData } = user.get();
        res.send(userData);
    }
    catch {
        res.status(500).send({ message: error.message });
    }
};