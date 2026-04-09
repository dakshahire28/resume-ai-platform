const Resume = require('../models/Resume');
let puppeteer;
try {
  puppeteer = require('puppeteer');
} catch (e) {
  console.warn('Puppeteer not installed. PDF export will be unavailable.');
}

exports.createResume = async (req, res) => {
  try {
    const { title, template, settings, data } = req.body;
    const resume = await Resume.create({
      user: req.user?.id || null,
      title,
      template,
      settings,
      data
    });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ updatedAt: -1 });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateResume = async (req, res) => {
  try {
    const { title, template, settings, data } = req.body;
    const resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { title, template, settings, data },
      { new: true }
    );
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findByIdAndDelete(req.params.id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });
    res.json({ message: 'Resume deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.exportPDF = async (req, res) => {
  if (!puppeteer) {
    return res.status(501).json({ message: 'PDF Export service is not configured on the server. Please install puppeteer.' });
  }

  try {
    const { html } = req.body;
    if (!html) return res.status(400).json({ message: 'HTML content is required' });

    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set content and wait for images/fonts to load
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
