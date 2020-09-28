const express = require('express');

const needController = require('../controllers/needController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(needController.getAllNeeds)
    .post(authController.protect, needController.createNeed);

router
    .route('/:id')
    .get(needController.getNeedById)
    .patch(authController.protect, needController.updateNeed)
    .delete(authController.protect, needController.deleteNeed);

module.exports = router;
