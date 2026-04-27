const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Models to try in order of preference
const MODELS = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.0-flash-lite'];
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 3000;

/**
 * Checks if an error is transient (503 overloaded, 429 quota exceeded).
 */
function isTransientError(error) {
  const status = error?.status || error?.httpStatusCode || error?.code;
  if (status === 503 || status === 429) return true;

  const msg = error?.message || '';
  return (
    msg.includes('503') ||
    msg.includes('429') ||
    msg.includes('overloaded') ||
    msg.includes('UNAVAILABLE') ||
    msg.includes('RESOURCE_EXHAUSTED') ||
    msg.includes('high demand') ||
    msg.includes('quota')
  );
}

/**
 * Extracts a clean, user-friendly message from a Gemini API error.
 */
function getCleanErrorMessage(error) {
  const msg = error?.message || '';

  if (msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota') || msg.includes('429')) {
    return 'AI quota limit reached. The free tier daily limit has been exceeded. Please wait a few minutes and try again.';
  }
  if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('overloaded') || msg.includes('high demand')) {
    return 'The AI model is currently experiencing high demand. Please wait a moment and try again.';
  }
  // Return a generic message to avoid leaking raw API errors
  return 'AI service is temporarily unavailable. Please try again in a few minutes.';
}

/**
 * Calls the Gemini API with automatic retry and model fallback.
 * Tries each model in order, with retries per model. If a model returns
 * a transient error (503/429), it retries with backoff, then falls back 
 * to the next model.
 */
async function callGemini({ contents, config }) {
  let lastError = null;

  for (const model of MODELS) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[Gemini] Trying model=${model}, attempt=${attempt}`);
        const response = await ai.models.generateContent({
          model,
          contents,
          config,
        });
        console.log(`[Gemini] Success with model=${model}`);
        return response;
      } catch (error) {
        lastError = error;

        console.warn(`[Gemini] model=${model} attempt=${attempt} failed: ${error.message?.substring(0, 120)}`);

        if (!isTransientError(error)) {
          // Non-transient error — don't retry, fail immediately
          throw error;
        }

        // Wait before retrying (exponential backoff)
        if (attempt < MAX_RETRIES) {
          const delay = RETRY_DELAY_MS * attempt;
          console.log(`[Gemini] Waiting ${delay}ms before retry...`);
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }
    // All retries exhausted for this model, try next
    console.warn(`[Gemini] All retries exhausted for model=${model}, trying next model...`);
  }

  // All models and retries exhausted — throw a clean error
  const cleanMsg = getCleanErrorMessage(lastError);
  const cleanError = new Error(cleanMsg);
  cleanError.isQuotaError = true;
  throw cleanError;
}

module.exports = { ai, callGemini, getCleanErrorMessage, isTransientError };
