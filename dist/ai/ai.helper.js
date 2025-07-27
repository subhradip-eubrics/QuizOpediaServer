"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateQuizFromAI = generateQuizFromAI;
const gemini_client_1 = require("./gemini.client");
async function generateQuizFromAI(topic, numOfQn) {
    const prompt = `
You are to generate a quiz in JSON format.

- Topic: "${topic}"
- Tags: at least 5 meaningful tags
- Number of questions: ${numOfQn}
- Each question must be a multiple choice question (MCQ).
- Every question should have:
  - "text" (string): The question itself
  - "options" (array of 4 strings): Exactly 4 answer choices
  - "answer" (string): One of the 4 options which is the correct answer

The final output must strictly follow this **JSON format**:

{
  "title": "${topic} Quiz",
  "topic": "${topic}",
  "tags": ["${topic}", "Next tag similar to topic", ...],
  "questions": [
    {
      "text": "Question 1 goes here...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Option A"
    },
    ...
  ]
}

`;
    const result = await gemini_client_1.genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `${prompt}`,
    });
    const text = result.text;
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}') + 1;
    const jsonString = text.slice(jsonStart, jsonEnd);
    console.log(jsonString);
    return JSON.parse(jsonString);
}
//# sourceMappingURL=ai.helper.js.map