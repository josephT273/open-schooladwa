import OpenSchoolAdwa from "../dist/index.js";
import "dotenv/config";

async function testDictionary() {
	console.log("🔍 Testing Dictionary API...");
	const osa = new OpenSchoolAdwa();

	try {
		const result = await osa.dictionary("hello");
		console.log("✅ Dictionary API working:", result[0]?.word || "Word found");
	} catch (error) {
		console.log("❌ Dictionary API error:", error.message);
	}
}

async function testOpenLibrary() {
	console.log("📚 Testing Open Library API...");
	const osa = new OpenSchoolAdwa();

	try {
		const result = await osa.openBook("javascript");
		console.log(
			"✅ Open Library API working:",
			result.numFound > 0 ? `${result.numFound} books found` : "No books found",
		);
	} catch (error) {
		console.log("❌ Open Library API error:", error.message);
	}
}

async function testGoogleBooks() {
	console.log("📖 Testing Google Books API...");
	const osa = new OpenSchoolAdwa();

	try {
		const result = await osa.googleBook("python");
		console.log(
			"✅ Google Books API working:",
			result.totalItems > 0
				? `${result.totalItems} books found`
				: "No books found",
		);
	} catch (error) {
		console.log("❌ Google Books API error:", error.message);
	}
}

async function testGoogleAI() {
	console.log("🤖 Testing Google AI (Gemini) API...");
	const osa = new OpenSchoolAdwa();
	const GOOGLE_API = "";
	if (!GOOGLE_API) {
		console.log(
			"⚠️  Google API key not found. Set GOOGLE_API environment variable to test.",
		);
		return;
	}

	try {
		const config = {
			GEMINI_API_KEY: GOOGLE_API,
			model: "gemini-2.0-flash-001",
		};

		const result = await osa
			.initGoogle(config)
			.chat("Say hello in a friendly way");

		console.log("✅ Google AI API working:", result);
	} catch (error) {
		console.log("❌ Google AI API error:", error.message);
	}
}

async function runAllTests() {
	console.log("🚀 Starting Open-SchoolAdwa API Tests\n");

	await testDictionary();
	console.log();

	await testOpenLibrary();
	console.log();

	await testGoogleBooks();
	console.log();

	await testGoogleAI();
	console.log();

	console.log("✨ All tests completed!");
}

runAllTests().catch(console.error);
