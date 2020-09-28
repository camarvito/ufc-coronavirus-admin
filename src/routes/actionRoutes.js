const express = require('express');

const actionController = require('../controllers/actionController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/')
    .get(actionController.getAllActions)
    .post(authController.protect, actionController.createAction);

router
    .route('/:id')
    .get(actionController.getActionById)
    .patch(authController.protect, actionController.updateAction)
    .delete(authController.protect, actionController.deleteAction);

module.exports = router;
