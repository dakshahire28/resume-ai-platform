const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const analyzeController = require('../controllers/analyzeController');
const autoImproveController = require('../controllers/autoImproveController');
const { protect } = require('../middleware/authMiddleware');

// Public AI routes (no auth needed for analyzer)
router.post('/analyze', analyzeController.analyzeResume);

// Protected routes (require login)
router.post('/auto-improve', protect, autoImproveController.autoImproveResume);
router.post('/generate-css', protect, autoImproveController.generateCSS);
router.post('/', protect, resumeController.createResume);
router.get('/', protect, resumeController.getResumes);
router.get('/:id', protect, resumeController.getResumeById);
router.put('/:id', protect, resumeController.updateResume);
router.delete('/:id', protect, resumeController.deleteResume);
router.post('/:id/export/pdf', protect, resumeController.exportPDF);

module.exports = router;
