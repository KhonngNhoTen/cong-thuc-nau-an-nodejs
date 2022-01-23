const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');
const MenuController = require('../controllers/Menu.controller');
const authMiddleWare = require('../middlewares/auth.middleware');
// routing cho authentication
router.post('/login',AuthController.login);
router.post('/register', AuthController.save);
router.post('/set-email', AuthController.setEmail);


// routing cho menu
router.use('/menu',authMiddleWare);
router.get('/menu',MenuController.getAllMenu);
router.post('/menu',MenuController.saveMenu);
router.get('/menu/:id',MenuController.getAllMenu);
router.delete('/menu/:id',MenuController.deleteMenu);
router.put('/menu/:id',MenuController.saveMenu);



// routing cho food




module.exports = router;