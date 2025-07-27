import { GoogleGenAI } from '@google/genai';

export const genAI = new GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyBnC8_IhsXK3xRlEarvpQaLKKOGrgcSKFU',
});


// export async function genTask () {
//     const response = await genAI.models.generateContent({
//         model: 'gemini-2.5-flash',
//         contents: "Tell me a story about super sukhoi su 30 mki within 100 words",
//     });
//     console.log(response.text);
// }

// genTask();