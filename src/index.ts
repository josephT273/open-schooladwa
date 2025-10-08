import type { config } from "./interface";
import GoogleAI from "./plugins/google-ai.js";
import "dotenv/config";

export default class OpenSchoolAdwa {
	private google?: GoogleAI;

	initGoogle(_config: config) {
		this.google = new GoogleAI(_config);
		return this;
	}

	async chat(prompt: string) {
		if (!this.google) {
			throw Error("Google AI not initialized. Call initGoogle() first.");
		}
		return await this.google.chat(prompt);
	}
}
