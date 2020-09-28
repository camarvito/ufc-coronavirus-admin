const express = require('express');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.login);

router.use(authController.protect);

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

router.route('/me').get(userController.getMe, userController.getUser);

module.exports = router;
