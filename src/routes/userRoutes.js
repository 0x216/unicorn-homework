const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/authMiddleware');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);

router.get('/me', auth, userController.getMe);

module.exports = router;
