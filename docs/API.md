# 🔧 API Reference

Complete API reference for Open-SchoolAdwa library.

## OpenSchoolAdwa Class

The main class that provides access to all library features.

### Constructor

```javascript
new OpenSchoolAdwa()
```

Creates a new instance of OpenSchoolAdwa.

**Returns:** `OpenSchoolAdwa` instance

**Example:**
```javascript
import OpenSchoolAdwa from 'open-schooladwa';
const osa = new OpenSchoolAdwa();
```

---

## Methods

### `initGoogle(config)`

Initialize Google AI (Gemini) integration for chat functionality.

**Parameters:**
- `config` (Object): Configuration object
  - `GEMINI_API_KEY` (string, required): Your Google Gemini API key
  - `model` (string, optional): Model to use (default: "gemini-2.0-flash-001")

**Returns:** `OpenSchoolAdwa` - Returns the instance for method chaining

**Throws:** 
- `Error` if configuration is invalid

**Example:**
```javascript
const config = {
    GEMINI_API_KEY: "your-api-key-here",
    model: "gemini-2.0-flash-001"
};

const osa = new OpenSchoolAdwa();
osa.initGoogle(config);
```

**Supported Models:**
- `gemini-2.0-flash-001` (default)
- `gemini-1.5-pro`
- `gemini-1.5-flash`

---

### `chat(prompt)`

Send a prompt to Google AI and receive a response.

**Parameters:**
- `prompt` (string, required): The question or prompt to send to AI

**Returns:** `Promise<string>` - AI-generated response

**Throws:**
- `Error` if Google AI is not initialized
- `Error` if API request fails

**Example:**
```javascript
// Initialize first
osa.initGoogle({ GEMINI_API_KEY: "your-key" });

// Use chat
const response = await osa.chat("Explain recursion in programming");
console.log(response);
```

**Error Handling:**
```javascript
try {
    const response = await osa.chat("Hello");
} catch (error) {
    if (error.message.includes("not initialized")) {
        console.log("Please call initGoogle() first");
    } else {
        console.log("API Error:", error.message);
    }
}
```

---

### `dictionary(word)`

Look up word definitions using the Dictionary API.

**Parameters:**
- `word` (string, required): The word to look up

**Returns:** `Promise<Array>` - Array of word definition objects

**Response Format:**
```javascript
[
    {
        word: "algorithm",
        phonetic: "/ˈælɡəˌrɪðəm/",
        phonetics: [...],
        meanings: [
            {
                partOfSpeech: "noun",
                definitions: [
                    {
                        definition: "A collection of ordered steps that solve a mathematical problem.",
                        example: "The sorting algorithm efficiently organizes the data.",
                        synonyms: [...],
                        antonyms: [...]
                    }
                ],
                synonyms: [...],
                antonyms: [...]
            }
        ],
        license: {...},
        sourceUrls: [...]
    }
]
```

**Example:**
```javascript
const definitions = await osa.dictionary("algorithm");
console.log(definitions[0].meanings[0].definitions[0].definition);
```

**Error Handling:**
```javascript
try {
    const result = await osa.dictionary("nonexistentword123");
    if (result.length === 0) {
        console.log("No definitions found");
    }
} catch (error) {
    console.log("Dictionary lookup failed:", error.message);
}
```

---

### `openBook(bookName)`

Search for books using the Open Library API.

**Parameters:**
- `bookName` (string, required): The book title or topic to search for

**Returns:** `Promise<Object>` - Search results object

**Response Format:**
```javascript
{
    numFound: 1234,
    start: 0,
    numFoundExact: true,
    docs: [
        {
            key: "/works/OL123456W",
            title: "JavaScript: The Good Parts",
            author_name: ["Douglas Crockford"],
            first_publish_year: 2008,
            isbn: ["9780596517748"],
            language: ["eng"],
            subject: ["JavaScript", "Programming"],
            publisher: ["O'Reilly Media"],
            cover_i: 1234567,
            cover_edition_key: "OL123456W",
            ebook_count_i: 5,
            edition_count: 10,
            has_fulltext: true,
            public_scan_b: true
        }
    ]
}
```

**Example:**
```javascript
const results = await osa.openBook("javascript programming");
console.log(`Found ${results.numFound} books`);
console.log("First book:", results.docs[0].title);
```

**Filtering Results:**
```javascript
const results = await osa.openBook("python");
const recentBooks = results.docs.filter(book => 
    book.first_publish_year > 2020
);
console.log("Recent books:", recentBooks.length);
```

---

### `googleBook(bookName)`

Search for books using the Google Books API.

**Parameters:**
- `bookName` (string, required): The book title or topic to search for

**Returns:** `Promise<Object>` - Search results object

**Response Format:**
```javascript
{
    kind: "books#volumes",
    totalItems: 1000000,
    items: [
        {
            kind: "books#volume",
            id: "book-id-123",
            etag: "etag-string",
            selfLink: "https://www.googleapis.com/books/v1/volumes/book-id-123",
            volumeInfo: {
                title: "Clean Code",
                authors: ["Robert C. Martin"],
                publisher: "Prentice Hall",
                publishedDate: "2008-08-01",
                description: "A Handbook of Agile Software Craftsmanship...",
                industryIdentifiers: [
                    {
                        type: "ISBN_13",
                        identifier: "9780132350884"
                    }
                ],
                readingModes: {
                    text: true,
                    image: true
                },
                pageCount: 464,
                printType: "BOOK",
                categories: ["Computers"],
                maturityRating: "NOT_MATURE",
                allowAnonLogging: true,
                contentVersion: "1.2.3.4.preview.0",
                panelizationSummary: {...},
                imageLinks: {
                    smallThumbnail: "http://books.google.com/books/content?id=...",
                    thumbnail: "http://books.google.com/books/content?id=..."
                },
                language: "en",
                previewLink: "http://books.google.com/books?id=...",
                infoLink: "http://books.google.com/books?id=...",
                canonicalVolumeLink: "https://books.google.com/books/about/..."
            },
            saleInfo: {...},
            accessInfo: {...},
            searchInfo: {...}
        }
    ]
}
```

**Example:**
```javascript
const results = await osa.googleBook("machine learning");
console.log(`Found ${results.totalItems} books`);
console.log("First book:", results.items[0].volumeInfo.title);
```

**Accessing Book Details:**
```javascript
const results = await osa.googleBook("python");
const book = results.items[0];
console.log("Title:", book.volumeInfo.title);
console.log("Authors:", book.volumeInfo.authors.join(", "));
console.log("Description:", book.volumeInfo.description);
console.log("Page Count:", book.volumeInfo.pageCount);
```

---

## TypeScript Support

The library includes full TypeScript definitions:

```typescript
import OpenSchoolAdwa from 'open-schooladwa';
import type { config } from 'open-schooladwa';

const osa = new OpenSchoolAdwa();

// Type-safe configuration
const aiConfig: config = {
    GEMINI_API_KEY: process.env.GOOGLE_API!,
    model: "gemini-2.0-flash-001"
};

osa.initGoogle(aiConfig);

// Type-safe method calls
const response: string = await osa.chat("Hello");
const definitions: any[] = await osa.dictionary("word");
```

### Type Definitions

```typescript
interface config {
    model: "gemini-2.0-flash-001" | string;
    GEMINI_API_KEY: string;
}
```

---

## Error Handling

### Common Error Types

1. **Initialization Errors**
   ```javascript
   // Error: Google AI not initialized
   try {
       await osa.chat("Hello");
   } catch (error) {
       console.log(error.message); // "Google AI not initialized. Call initGoogle() first."
   }
   ```

2. **API Errors**
   ```javascript
   // Network or API errors
   try {
       const books = await osa.googleBook("search term");
   } catch (error) {
       console.log("API Error:", error.message);
   }
   ```

3. **Validation Errors**
   ```javascript
   // Invalid parameters
   try {
       const result = await osa.dictionary("");
   } catch (error) {
       console.log("Validation Error:", error.message);
   }
   ```

### Best Practices

```javascript
async function robustExample() {
    const osa = new OpenSchoolAdwa();
    
    try {
        // Initialize with error handling
        if (!process.env.GOOGLE_API) {
            throw new Error("Google API key not found");
        }
        
        osa.initGoogle({
            GEMINI_API_KEY: process.env.GOOGLE_API,
            model: "gemini-2.0-flash-001"
        });
        
        // Use with error handling
        const response = await osa.chat("Hello");
        console.log("AI Response:", response);
        
    } catch (error) {
        console.error("Error:", error.message);
        // Fallback behavior
    }
}
```

---

## Rate Limits and Best Practices

### API Rate Limits

- **Dictionary API**: No official rate limit, but be respectful
- **Open Library API**: No official rate limit
- **Google Books API**: 1000 requests per day (free tier)
- **Google AI API**: Varies by model and usage

### Best Practices

1. **Implement Retry Logic**
   ```javascript
   async function withRetry(operation, maxRetries = 3) {
       for (let i = 0; i < maxRetries; i++) {
           try {
               return await operation();
           } catch (error) {
               if (i === maxRetries - 1) throw error;
               await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
           }
       }
   }
   ```

2. **Cache Results**
   ```javascript
   const cache = new Map();
   
   async function cachedDictionary(word) {
       if (cache.has(word)) {
           return cache.get(word);
       }
       
       const result = await osa.dictionary(word);
       cache.set(word, result);
       return result;
   }
   ```

3. **Batch Operations**
   ```javascript
   async function batchBookSearch(topics) {
       const promises = topics.map(topic => osa.openBook(topic));
       const results = await Promise.allSettled(promises);
       return results;
   }
   ```

---

## Migration Guide

### From v0.0.0 to v0.0.1

No breaking changes. All existing code will continue to work.

### Upcoming Changes

- Enhanced error messages
- Additional book search filters
- Caching support
- Batch operations

---

## Support

For API-related questions and issues:

- 📖 **Documentation**: [GitHub Wiki](https://github.com/josephT273/open-schooladwa/wiki)
- 🐛 **Issues**: [GitHub Issues](https://github.com/josephT273/open-schooladwa/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/josephT273/open-schooladwa/discussions)