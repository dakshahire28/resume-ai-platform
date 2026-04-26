const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Global Request Logger for diagnostics
app.use((req, res, next) => {
  console.log(`[INCOMING REQUEST] ${req.method} ${req.url}`);
  next();
});

// Permissive CORS for proxy compatibility
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CareerPilot API is running' });
});

// API Routes
app.use('/api/resumes', resumeRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[SERVER ERROR]', err);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;
