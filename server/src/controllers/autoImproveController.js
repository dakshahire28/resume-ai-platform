const { GoogleGenAI, Type } = require('@google/genai');
const Resume = require('../models/Resume');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const resumeDataSchema = {
  type: Type.OBJECT,
  properties: {
    basics: {
      type: Type.OBJECT,
      properties: {
        firstName: { type: Type.STRING },
        lastName: { type: Type.STRING },
        headline: { type: Type.STRING },
        email: { type: Type.STRING },
        phone: { type: Type.STRING },
        location: { type: Type.STRING },
        website: { type: Type.STRING },
        summary: { type: Type.STRING }
      }
    },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          company: { type: Type.STRING },
          position: { type: Type.STRING },
          location: { type: Type.STRING },
          date: { type: Type.STRING },
          description: { type: Type.STRING, description: "Detailed description of responsibilities and achievements" },
          summary: { type: Type.STRING }
        }
      }
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          institution: { type: Type.STRING },
          studyType: { type: Type.STRING },
          area: { type: Type.STRING },
          date: { type: Type.STRING },
          score: { type: Type.STRING }
        }
      }
    },
    skills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          level: { type: Type.STRING },
          keywords: { type: Type.STRING }
        }
      }
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
          url: { type: Type.STRING },
          date: { type: Type.STRING }
        }
      }
    }
  }
};

exports.autoImproveResume = async (req, res) => {
  try {
    const { source, resumeId, resumeText, missingKeywords, targetJob } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY is missing." });
    }

    let baseData = null;
    let prompt = "";
    
    const keywordsText = missingKeywords && missingKeywords.length > 0 
      ? `Ensure you naturally incorporate these missing keywords into the experience bullets or summary: ${missingKeywords.join(', ')}` 
      : "";

    if (source === 'saved') {
      const existingResume = await Resume.findById(resumeId);
      if (!existingResume) return res.status(404).json({ message: "Resume not found" });
      
      baseData = existingResume;
      
      prompt = `
        You are an expert resume writer. I am giving you a structured JSON resume.
        Rewrite the "summary" and the "description" fields within the "experience" arrays to make them more impactful, quantifiable, and ATS-friendly for a target job of: ${targetJob || 'Professional Role'}.
        
        ${keywordsText}
        
        Keep all other factual information (names, dates, companies) exactly the same. Only improve the phrasing and keywords.
        Return the exact JSON schema requested.
        
        Original JSON Resume:
        ${JSON.stringify(existingResume.data)}
      `;

    } else if (source === 'pdf') {
      if (!resumeText) return res.status(400).json({ message: "No PDF text provided" });
      
      prompt = `
        You are an expert ATS parser and resume writer. I am giving you raw unstructured text extracted from a PDF resume.
        Parse this text into the exact JSON schema requested.
        While parsing, improve the work experience bullet points (put them in the "description" field) to be more impactful and quantifiable for a target job of: ${targetJob || 'Professional Role'}.
        
        ${keywordsText}
        
        Raw PDF Text:
        ${resumeText}
      `;
    } else {
      return res.status(400).json({ message: "Invalid source" });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: resumeDataSchema
      }
    });

    const parsedData = JSON.parse(response.text);

    // Create a new clone/import so we don't destroy their original one immediately
    const newResume = new Resume({
      title: source === 'saved' ? `(AI Improved) ${baseData.title}` : `Imported Resume`,
      template: source === 'saved' ? baseData.template : 'Modern',
      settings: source === 'saved' ? baseData.settings : undefined,
      data: parsedData
    });

    await newResume.save();

    res.status(200).json({ message: "Success", newResumeId: newResume._id });
  } catch (error) {
    console.error("Auto-improve failed:", error);
    res.status(500).json({ message: "Auto-improve failed", error: error.message, stack: error.stack });
  }
};
