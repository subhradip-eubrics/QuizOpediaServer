"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genAI = void 0;
const dotenv = require("dotenv");
dotenv.config();
const genai_1 = require("@google/genai");
exports.genAI = new genai_1.GoogleGenAI({
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
});
//# sourceMappingURL=gemini.client.js.map