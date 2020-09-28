const express = require('express');

const placeController = require('../controllers/placeController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(placeController.getAllPlaces)
    .post(authController.protect, placeController.createPlace);

router
    .route('/:id')
    .patch(authController.protect, placeController.updatePlace)
    .delete(authController.protect, placeController.deletePlace);

module.exports = router;
