const { Type } = require('@google/genai');
const { callGemini, getCleanErrorMessage, isTransientError } = require('../utils/geminiHelper');

exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText, targetJob } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Resume text is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ message: "GEMINI_API_KEY is missing from server environment variables." });
    }

    const jobContext = targetJob 
      ? `Evaluate this resume against this job description or title: ${targetJob}.` 
      : `Evaluate this resume for a general professional role.`;

    const prompt = `
      You are an expert ATS (Applicant Tracking System) and professional technical recruiter.
      ${jobContext}
      
      Resume text: 
      ${resumeText}

      Analyze the resume and return a strict JSON object with the exact schema requested.
    `;

    const response = await callGemini({
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER, description: "Overall ATS score out of 100" },
            subScores: {
              type: Type.OBJECT,
              properties: {
                impact: { type: Type.INTEGER, description: "Score out of 100" },
                brevity: { type: Type.INTEGER, description: "Score out of 100" },
                keywords: { type: Type.INTEGER, description: "Score out of 100" }
              }
            },
            presentKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            suggestions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, description: "One of: warning, info, success" },
                  text: { type: Type.STRING, description: "Short title of suggestion" },
                  subtext: { type: Type.STRING, description: "Detailed suggestion description" }
                }
              }
            }
          },
          required: ["score", "subScores", "presentKeywords", "missingKeywords", "suggestions"]
        }
      }
    });

    res.status(200).json(JSON.parse(response.text));
  } catch (error) {
    console.error("Resume analysis failed:", error.message?.substring(0, 200));
    
    const statusCode = isTransientError(error) ? 503 : 500;
    const message = isTransientError(error) 
      ? getCleanErrorMessage(error) 
      : "Analysis failed. Please try again.";

    res.status(statusCode).json({ message });
  }
};
