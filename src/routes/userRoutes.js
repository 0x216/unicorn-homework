const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/register', userController.register);
router.put('/update/:id', userController.update);
router.delete('/delete/:id', userController.delete);

module.exports = router;
