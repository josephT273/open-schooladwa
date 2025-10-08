import { GoogleGenAI } from "@google/genai";
import type { config } from "../interface";

export default class GoogleAI {
	private ai: GoogleGenAI;
	private model: "gemini-2.0-flash-001" | string;

	constructor({ GEMINI_API_KEY, model }: config) {
		this.model = model;
		this.ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
	}

	async chat(prompt: string) {
		const response = await this.ai.models.generateContent({
			model: this.model,
			contents: prompt,
		});

		return response.text;
	}
}
