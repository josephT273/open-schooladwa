# 📚 Open-SchoolAdwa Documentation

Welcome to the comprehensive documentation for Open-SchoolAdwa, your all-in-one toolbox for school projects and educational development.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
- [Examples](#examples)
- [Configuration](#configuration)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Open-SchoolAdwa is a centralized hub of essential tools designed to streamline your school projects, from research to collaboration. We've gathered the best APIs and resources from across the web and made them accessible in one convenient location.

### Key Features

- 🧠 **AI-Powered Assistance**: Google Gemini integration for intelligent help
- 📚 **Book Discovery**: Search across Open Library and Google Books
- 📖 **Dictionary Lookups**: Instant word definitions and meanings
- 🔧 **Easy Integration**: Simple API designed for quick implementation
- 📦 **TypeScript Support**: Full type definitions included
- 🚀 **Zero Configuration**: Works out of the box for most features

## Installation

### Prerequisites

- Node.js 16.0.0 or higher
- npm or yarn package manager

### Install the Package

```bash
# Using npm
npm install open-schooladwa

# Using yarn
yarn add open-schooladwa

# Using pnpm
pnpm add open-schooladwa
```

### Environment Setup (Optional)

For Google AI features, create a `.env` file in your project root:

```bash
# .env
GOOGLE_API=your_google_gemini_api_key_here
```

## Quick Start

```javascript
import OpenSchoolAdwa from 'open-schooladwa';
import 'dotenv/config';

// Create an instance
const osa = new OpenSchoolAdwa();

// Initialize Google AI (optional)
const config = {
    GEMINI_API_KEY: process.env.GOOGLE_API,
    model: "gemini-2.0-flash-001"
};
osa.initGoogle(config);

// Use the library
async function example() {
    // Get AI help
    const aiResponse = await osa.chat("Explain machine learning in simple terms");
    console.log(aiResponse);

    // Look up a word
    const definition = await osa.dictionary("algorithm");
    console.log(definition);

    // Search for books
    const books = await osa.openBook("javascript");
    console.log(books);
}
```

## API Reference

### OpenSchoolAdwa Class

The main class that provides access to all features.

#### Constructor

```javascript
const osa = new OpenSchoolAdwa();
```

#### Methods

##### `initGoogle(config)`

Initialize Google AI (Gemini) integration.

**Parameters:**
- `config` (Object): Configuration object
  - `GEMINI_API_KEY` (string): Your Google Gemini API key
  - `model` (string): Model to use (default: "gemini-2.0-flash-001")

**Returns:** `OpenSchoolAdwa` instance (for method chaining)

**Example:**
```javascript
const config = {
    GEMINI_API_KEY: "your-api-key",
    model: "gemini-2.0-flash-001"
};
osa.initGoogle(config);
```

##### `chat(prompt)`

Send a prompt to Google AI and get a response.

**Parameters:**
- `prompt` (string): The question or prompt to send to AI

**Returns:** `Promise<string>` - AI response

**Throws:** Error if Google AI is not initialized

**Example:**
```javascript
const response = await osa.chat("How do I implement a binary search tree?");
console.log(response);
```

##### `dictionary(word)`

Look up word definitions using the Dictionary API.

**Parameters:**
- `word` (string): The word to look up

**Returns:** `Promise<Array>` - Array of word definitions

**Example:**
```javascript
const definitions = await osa.dictionary("algorithm");
console.log(definitions[0].meanings[0].definitions[0].definition);
```

##### `openBook(bookName)`

Search for books using Open Library API.

**Parameters:**
- `bookName` (string): The book title or topic to search for

**Returns:** `Promise<Object>` - Search results object

**Example:**
```javascript
const results = await osa.openBook("machine learning");
console.log(`Found ${results.numFound} books`);
console.log(results.docs[0].title); // First book title
```

##### `googleBook(bookName)`

Search for books using Google Books API.

**Parameters:**
- `bookName` (string): The book title or topic to search for

**Returns:** `Promise<Object>` - Search results object

**Example:**
```javascript
const results = await osa.googleBook("javascript programming");
console.log(`Found ${results.totalItems} books`);
console.log(results.items[0].volumeInfo.title); // First book title
```

## Examples

### Basic Usage

```javascript
import OpenSchoolAdwa from 'open-schooladwa';

const osa = new OpenSchoolAdwa();

async function basicExample() {
    // Dictionary lookup
    const word = await osa.dictionary("programming");
    console.log("Definition:", word[0].meanings[0].definitions[0].definition);

    // Book search
    const books = await osa.openBook("python");
    console.log("Books found:", books.numFound);
}
```

### AI-Powered Research

```javascript
import OpenSchoolAdwa from 'open-schooladwa';
import 'dotenv/config';

const osa = new OpenSchoolAdwa();

async function researchExample() {
    // Initialize AI
    const config = {
        GEMINI_API_KEY: process.env.GOOGLE_API,
        model: "gemini-2.0-flash-001"
    };
    osa.initGoogle(config);

    // Get AI insights
    const insights = await osa.chat("What are the key concepts in data structures?");
    console.log("AI Insights:", insights);

    // Find related books
    const books = await osa.googleBook("data structures");
    console.log("Recommended books:", books.items.slice(0, 3));
}
```

### Comprehensive Project Helper

```javascript
import OpenSchoolAdwa from 'open-schooladwa';
import 'dotenv/config';

class SchoolProjectHelper {
    constructor() {
        this.osa = new OpenSchoolAdwa();
        this.initialized = false;
    }

    async initialize() {
        if (process.env.GOOGLE_API) {
            const config = {
                GEMINI_API_KEY: process.env.GOOGLE_API,
                model: "gemini-2.0-flash-001"
            };
            this.osa.initGoogle(config);
            this.initialized = true;
        }
    }

    async researchTopic(topic) {
        console.log(`Researching: ${topic}`);
        
        // Get AI overview
        if (this.initialized) {
            const overview = await this.osa.chat(
                `Provide a brief overview of ${topic} and suggest key areas to explore.`
            );
            console.log("AI Overview:", overview);
        }

        // Find books
        const [openLib, googleBooks] = await Promise.all([
            this.osa.openBook(topic),
            this.osa.googleBook(topic)
        ]);

        console.log(`Open Library: ${openLib.numFound} books`);
        console.log(`Google Books: ${googleBooks.totalItems} books`);
    }

    async defineTerms(terms) {
        for (const term of terms) {
            try {
                const definition = await this.osa.dictionary(term);
                console.log(`${term}: ${definition[0].meanings[0].definitions[0].definition}`);
            } catch (error) {
                console.log(`Could not define ${term}: ${error.message}`);
            }
        }
    }
}

// Usage
const helper = new SchoolProjectHelper();
await helper.initialize();
await helper.researchTopic("machine learning");
await helper.defineTerms(["algorithm", "neural network"]);
```

## Configuration

### Google AI Configuration

```javascript
const config = {
    GEMINI_API_KEY: "your-api-key-here",
    model: "gemini-2.0-flash-001" // or other supported models
};
```

### Environment Variables

Create a `.env` file in your project root:

```bash
# Required for Google AI features
GOOGLE_API=your_google_gemini_api_key_here
```

### TypeScript Configuration

The library includes full TypeScript definitions. No additional configuration needed:

```typescript
import OpenSchoolAdwa from 'open-schooladwa';
import type { config } from 'open-schooladwa';

const osa = new OpenSchoolAdwa();
const aiConfig: config = {
    GEMINI_API_KEY: process.env.GOOGLE_API!,
    model: "gemini-2.0-flash-001"
};
```

## Error Handling

The library includes comprehensive error handling:

```javascript
import OpenSchoolAdwa from 'open-schooladwa';

const osa = new OpenSchoolAdwa();

async function errorHandlingExample() {
    try {
        // This will throw an error if Google AI is not initialized
        const response = await osa.chat("Hello");
    } catch (error) {
        console.log("Error:", error.message);
        // Output: "Google AI not initialized. Call initGoogle() first."
    }

    try {
        // Handle API errors gracefully
        const books = await osa.openBook("nonexistent-book-12345");
        console.log("Books found:", books.numFound);
    } catch (error) {
        console.log("Search failed:", error.message);
    }
}
```

### Common Error Scenarios

1. **Google AI not initialized**: Call `initGoogle()` before using `chat()`
2. **Invalid API key**: Check your Google API key configuration
3. **Network errors**: Handle network connectivity issues
4. **Rate limiting**: Implement retry logic for API rate limits

## Contributing

We welcome contributions! Here's how you can help:

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/open-schooladwa.git`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Run tests: `npx jest`

### Adding New APIs

1. Create a new plugin in `src/plugins/`
2. Follow the existing pattern for API integration
3. Add tests in `__tests__/`
4. Update documentation
5. Submit a pull request

### Reporting Issues

- Use GitHub Issues to report bugs
- Include steps to reproduce
- Provide environment details
- Add error logs if applicable

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Support

- 📖 **Documentation**: [GitHub Wiki](https://github.com/josephT273/open-schooladwa/wiki)
- 🐛 **Issues**: [GitHub Issues](https://github.com/josephT273/open-schooladwa/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/josephT273/open-schooladwa/discussions)
- ⭐ **Star**: [GitHub Repository](https://github.com/josephT273/open-schooladwa)

---

**Made with ❤️ for students and developers worldwide**