const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function generateInterviewReport(data) {
  try {
    const prompt = `
Return ONLY valid JSON.

Job Description:
${data.jobDescription}

Self Description:
${data.selfDescription || ""}

Resume:
${data.resume || ""}

Format:
{
  "title": "string",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "high|medium|low"
    }
  ],
  "preparationPlan": [
    {
      "day": number,
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text || "";

    const json = text.match(/\{[\s\S]*\}/);

    if (!json) {
      throw new Error("Invalid AI response");
    }

    return JSON.parse(json[0]);
  } catch (err) {
    console.log("AI ERROR:", err.message);

    // ❌ fallback only if AI fails
    return {
      title: "Fallback Interview Plan",
      matchScore: 60,
      technicalQuestions: [],
      behavioralQuestions: [],
      skillGaps: [],
      preparationPlan: [],
    };
  }
}

module.exports = generateInterviewReport;