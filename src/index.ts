import type { config } from "./interface";
import Dictionary from "./plugins/dictionary-api.js";
import GoogleAI from "./plugins/google-ai.js";
import "dotenv/config";
import GoogleLibrary from "./plugins/google-books.js";
import OpenLibrary from "./plugins/open-library.js";

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

	// this is not dependent to any of the above packages
	async dictionary(word: string) {
		const define = new Dictionary().define(word);
		return define;
	}

	async openBook(bookName: string) {
		const books = new OpenLibrary().define(bookName);
		return books;
	}

	async googleBook(bookName: string) {
		const books = new GoogleLibrary().define(bookName);
		return books;
	}
}
