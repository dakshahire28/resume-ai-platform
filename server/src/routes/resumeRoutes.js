const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const analyzeController = require('../controllers/analyzeController');
const autoImproveController = require('../controllers/autoImproveController');

router.post('/auto-improve', autoImproveController.autoImproveResume);
router.post('/generate-css', autoImproveController.generateCSS);
router.post('/analyze', analyzeController.analyzeResume);
router.post('/', resumeController.createResume);
router.get('/', resumeController.getResumes);
router.get('/:id', resumeController.getResumeById);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);
router.post('/:id/export/pdf', resumeController.exportPDF);

module.exports = router;
