const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const prescriptionController =
require('../controllers/prescriptionController');

router.post(
    '/',
    authMiddleware,
    roleMiddleware('doctor'),
    prescriptionController.createPrescription
);

router.get(
    '/',
    authMiddleware,
    prescriptionController.getPrescriptions
);

router.put(
    '/:id',
    authMiddleware,
    roleMiddleware('doctor'),
    prescriptionController.updatePrescription
);
module.exports = router;