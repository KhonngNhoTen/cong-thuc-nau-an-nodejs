const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');
router.post('/login',AuthController.login);
router.post('/register', AuthController.save);
router.post('/set-email', AuthController.setEmail);

module.exports = router;