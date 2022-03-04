const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth.controller');
const MenuController = require('../controllers/Menu.controller');
const FoodController = require('../controllers/Food.controller');


const authMiddleWare = require('../middlewares/auth.middleware');
const upload = require('../middlewares/uploadImage.middleware');


// routing cho authentication
router.post('/login',AuthController.login);  /* admin accoount: admin@email.com | password: 12345 */
router.post('/register', AuthController.save);
router.post('/set-email', AuthController.setEmail);
router.post('/refesh-token', AuthController.refeshToken);

// routing cho menu
router.use('/menu',authMiddleWare);
router.get('/menu',MenuController.getAllMenu);
router.post('/menu',MenuController.saveMenu);
router.get('/menu/:id',MenuController.getAllMenu);
router.delete('/menu/:id',MenuController.deleteMenu);
router.put('/menu/:id',MenuController.saveMenu);



// routing cho food
router.post('/menu/:menuId/food',upload.singleUpload('img') ,FoodController.save);
router.get('/menu/:menuId/food',FoodController.getAllFoods);
router.post('/menu/:menuId/food/:id',FoodController.save);
router.delete('/menu/:menuId/food/:id',FoodController.delete);



module.exports = router;