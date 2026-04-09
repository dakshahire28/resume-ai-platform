const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are public by default now
// router.use(authMiddleware.protect);

router.post('/', resumeController.createResume);
router.get('/', resumeController.getResumes);
router.get('/:id', resumeController.getResumeById);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);
router.post('/:id/export/pdf', resumeController.exportPDF);

module.exports = router;
