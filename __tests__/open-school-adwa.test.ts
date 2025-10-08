import OpenSchoolAdwa from "../src/index";
import Dictionary from "../src/plugins/dictionary-api";
import GoogleAI from "../src/plugins/google-ai";
import GoogleLibrary from "../src/plugins/google-books";
import OpenLibrary from "../src/plugins/open-library";

// 🧠 Mock dependencies
jest.mock("../src/plugins/google-ai");
jest.mock("../src/plugins/dictionary-api");
jest.mock("../src/plugins/google-books");
jest.mock("../src/plugins/open-library");

describe("OpenSchoolAdwa", () => {
	const GEMINI_API_KEY = "fake-key";
	let app: OpenSchoolAdwa;

	beforeEach(() => {
		jest.clearAllMocks();
		app = new OpenSchoolAdwa();
	});

	it("should initialize Google AI correctly", () => {
		const config = { GEMINI_API_KEY, model: "gemini-2.0-flash-001" };
		const result = app.initGoogle(config);

		expect(GoogleAI).toHaveBeenCalledWith(config);
		expect(result).toBe(app);
	});

	it("should call GoogleAI.chat() and return a response", async () => {
		const mockChat = jest.fn().mockResolvedValue("Hello World Response");
		(GoogleAI as jest.Mock).mockImplementation(() => ({
			chat: mockChat,
		}));

		const config = { GEMINI_API_KEY, model: "gemini-2.0-flash-001" };
		app.initGoogle(config);

		const result = await app.chat("hello world");
		expect(mockChat).toHaveBeenCalledWith("hello world");
		expect(result).toBe("Hello World Response");
	});

	it("should throw error if Google AI is not initialized", async () => {
		await expect(app.chat("test")).rejects.toThrow(
			"Google AI not initialized. Call initGoogle() first.",
		);
	});

	it("should call Dictionary.define()", async () => {
		const mockDefine = jest.fn().mockResolvedValue("definition result");
		(Dictionary as jest.Mock).mockImplementation(() => ({
			define: mockDefine,
		}));

		const result = await app.dictionary("test");
		expect(mockDefine).toHaveBeenCalledWith("test");
		expect(result).toBe("definition result");
	});

	it("should call OpenLibrary.define()", async () => {
		const mockDefine = jest.fn().mockResolvedValue("open library books");
		(OpenLibrary as jest.Mock).mockImplementation(() => ({
			define: mockDefine,
		}));

		const result = await app.openBook("bible");
		expect(mockDefine).toHaveBeenCalledWith("bible");
		expect(result).toBe("open library books");
	});

	it("should call GoogleLibrary.define()", async () => {
		const mockDefine = jest.fn().mockResolvedValue("google books result");
		(GoogleLibrary as jest.Mock).mockImplementation(() => ({
			define: mockDefine,
		}));

		const result = await app.googleBook("javascript");
		expect(mockDefine).toHaveBeenCalledWith("javascript");
		expect(result).toBe("google books result");
	});
});
