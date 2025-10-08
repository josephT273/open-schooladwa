/**
 * Open-SchoolAdwa API - Comprehensive Usage Example
 * 
 * This example demonstrates all the features of the Open-SchoolAdwa library
 * including error handling, async/await patterns, and real-world usage scenarios.
 */

import OpenSchoolAdwa from "../dist/index.js";
import "dotenv/config";

class SchoolProjectHelper {
    constructor() {
        this.osa = new OpenSchoolAdwa();
        this.initialized = false;
    }

    /**
     * Initialize the library with Google AI configuration
     */
    async initialize() {
        if (!process.env.GOOGLE_API) {
            console.log("⚠️  Google API key not found. Some features will be limited.");
            return;
        }

        try {
            const config = {
                GEMINI_API_KEY: process.env.GOOGLE_API,
                model: "gemini-2.0-flash-001"
            };
            
            this.osa.initGoogle(config);
            this.initialized = true;
            console.log("✅ Open-SchoolAdwa initialized successfully!");
        } catch (error) {
            console.log("❌ Failed to initialize:", error.message);
        }
    }

    /**
     * Research a topic using multiple APIs
     */
    async researchTopic(topic) {
        console.log(`\n🔍 Researching: ${topic}`);
        console.log("=" .repeat(50));

        // 1. Get AI insights
        if (this.initialized) {
            try {
                const aiResponse = await this.osa.chat(
                    `Provide a brief overview of ${topic} and suggest 3 key areas to explore further.`
                );
                console.log("🤖 AI Overview:", aiResponse);
            } catch (error) {
                console.log("❌ AI Research failed:", error.message);
            }
        }

        // 2. Find books on the topic
        try {
            console.log("\n📚 Searching for books...");
            const [openLibBooks, googleBooks] = await Promise.all([
                this.osa.openBook(topic),
                this.osa.googleBook(topic)
            ]);

            console.log(`📖 Open Library: ${openLibBooks.numFound} books found`);
            console.log(`📖 Google Books: ${googleBooks.totalItems} books found`);

            // Show some book recommendations
            if (openLibBooks.docs && openLibBooks.docs.length > 0) {
                console.log("📚 Top Open Library recommendations:");
                openLibBooks.docs.slice(0, 3).forEach((book, index) => {
                    console.log(`   ${index + 1}. ${book.title} by ${book.author_name?.join(', ') || 'Unknown'}`);
                });
            }

            if (googleBooks.items && googleBooks.items.length > 0) {
                console.log("📚 Top Google Books recommendations:");
                googleBooks.items.slice(0, 3).forEach((book, index) => {
                    console.log(`   ${index + 1}. ${book.volumeInfo.title} by ${book.volumeInfo.authors?.join(', ') || 'Unknown'}`);
                });
            }
        } catch (error) {
            console.log("❌ Book search failed:", error.message);
        }
    }

    /**
     * Look up definitions for technical terms
     */
    async defineTerms(terms) {
        console.log(`\n📖 Looking up definitions for: ${terms.join(', ')}`);
        console.log("=" .repeat(50));

        for (const term of terms) {
            try {
                const definition = await this.osa.dictionary(term);
                if (definition && definition.length > 0) {
                    const wordData = definition[0];
                    console.log(`\n📝 ${wordData.word}:`);
                    if (wordData.meanings && wordData.meanings.length > 0) {
                        wordData.meanings[0].definitions.slice(0, 2).forEach((def, index) => {
                            console.log(`   ${index + 1}. ${def.definition}`);
                        });
                    }
                } else {
                    console.log(`❌ No definition found for: ${term}`);
                }
            } catch (error) {
                console.log(`❌ Failed to define ${term}:`, error.message);
            }
        }
    }

    /**
     * Get AI help for coding problems
     */
    async getCodingHelp(problem) {
        if (!this.initialized) {
            console.log("❌ Google AI not initialized. Cannot provide coding help.");
            return;
        }

        console.log(`\n💻 Getting coding help for: ${problem}`);
        console.log("=" .repeat(50));

        try {
            const help = await this.osa.chat(
                `I'm working on a school project and need help with: ${problem}. 
                Please provide a clear explanation and if applicable, show me some code examples.`
            );
            console.log("🤖 AI Coding Help:", help);
        } catch (error) {
            console.log("❌ Failed to get coding help:", error.message);
        }
    }
}

// Example usage
async function runExample() {
    console.log("🚀 Open-SchoolAdwa API - Comprehensive Example");
    console.log("=" .repeat(60));

    const helper = new SchoolProjectHelper();
    await helper.initialize();

    // Example 1: Research a topic
    await helper.researchTopic("machine learning");

    // Example 2: Look up technical terms
    await helper.defineTerms(["algorithm", "neural network", "data structure"]);

    // Example 3: Get coding help
    await helper.getCodingHelp("How to implement a binary search tree in JavaScript?");

    console.log("\n✨ Example completed! Open-SchoolAdwa is working perfectly!");
}

// Run the example
runExample().catch(console.error);