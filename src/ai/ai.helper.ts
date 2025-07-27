import { AiResponseDto } from 'src/dtos/ai.dto';
import { genAI } from './gemini.client';

export async function generateQuizFromAI(topic: string, numOfQn: number) {
console.log("hello");

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

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `${prompt}`,
  });

  const text = result.text;
  // console.log(text);
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}') + 1;

  const jsonString = text.slice(jsonStart, jsonEnd);
  console.log(jsonString);

  return JSON.parse(jsonString);
}

// generateQuizFromAI("4.5 Gen Russian Fighter Jets", 2);

// export async function generateAiAssist() {

// }


export async function aiFeedBack(data: AiResponseDto) {
  const {
    question,
    userAnswer,
    correctAnswer,
    prompt
  } = data;

  console.log(data);
  
  const mainPrompt = `
  give a very short answer within 30-40 words for the ${prompt}, where question is ${question}, correction option: ${correctAnswer}, userselected the option: ${userAnswer}
  `;

  const result = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `${mainPrompt}`
  });

  const text = result.text;

  console.log("Text: ", text);
  
  return text;
}


// const dat = {
//   "question": "How many jet engines are there in Su 30 MKI?",
//   "userAnswer": "3",
//   "correctAnswer": "2",
//   "prompt": "Why my answer is wrong??"
// }


// aiFeedBack(dat);