import OpenSchoolAdwa from "../dist";
import "dotenv/config.js";

async function gemini() {
	const osa = new OpenSchoolAdwa();
	const GEMINI_API_KEY = process.env.GOOGLE_API as string;

	const config = { GEMINI_API_KEY, model: "gemini-2.0-flash-001" };

	console.log(
		await osa
			.initGoogle(config)
			.chat("Write nodejs app that return the word hello world to the console"),
	);
}

async function google_book() {
	const osa = new OpenSchoolAdwa();
	console.log(osa.googleBook("HTML"));
}

async function open_library() {
	const osa = new OpenSchoolAdwa();
	console.log(osa.openBook("CSS"));
}

async function dictionary() {
	const osa = new OpenSchoolAdwa();
	console.log(osa.dictionary("Hello"));
}

gemini();
google_book();
open_library();
dictionary();
