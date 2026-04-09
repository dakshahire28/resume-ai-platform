const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  title: {
    type: String,
    required: true,
    default: 'Untitled Resume'
  },
  template: {
    type: String,
    default: 'Software Engineer'
  },
  settings: {
    font: { type: String, default: 'Inter' },
    fontSize: { type: Number, default: 14 },
    lineHeight: { type: Number, default: 1.5 },
    primaryColor: { type: String, default: '#4f46e5' },
    bgColor: { type: String, default: '#ffffff' },
    pageMargin: { type: Number, default: 48 },
    customCss: { type: String, default: '' }
  },
  data: {
    basics: {
      firstName: String,
      lastName: String,
      headline: String,
      email: String,
      phone: String,
      location: String,
      website: String,
      summary: String
    },
    picture: {
      url: String,
      size: Number,
      borderRadius: Number
    },
    profiles: [{
      network: String,
      username: String,
      url: String
    }],
    experience: [{
      company: String,
      position: String,
      location: String,
      date: String,
      description: String,
      summary: String
    }],
    education: [{
      institution: String,
      studyType: String,
      area: String,
      date: String,
      score: String
    }],
    skills: [{
      name: String,
      level: String,
      keywords: String
    }],
    languages: [{
      language: String,
      fluency: String
    }],
    interests: [{
      name: String,
      keywords: String
    }],
    projects: [{
      name: String,
      description: String,
      url: String,
      date: String
    }],
    volunteer: [{
      organization: String,
      position: String,
      startDate: String,
      endDate: String,
      summary: String
    }],
    awards: [{
      title: String,
      awarder: String,
      date: String,
      summary: String
    }],
    publications: [{
      name: String,
      publisher: String,
      date: String,
      url: String,
      summary: String
    }],
    references: [{
      name: String,
      relationship: String,
      phone: String,
      email: String
    }],
    custom: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', resumeSchema);
