# Open-SchoolAdwa Examples

This directory contains examples demonstrating how to use the Open-SchoolAdwa library.

## Quick Start

1. Install the library:
```bash
npm install open-schooladwa
```

2. Set up your environment variables (optional for Google AI):
```bash
# Create a .env file
echo "GOOGLE_API=your_google_api_key_here" > .env
```

3. Run the examples:
```bash
# Basic functionality test
node example/test-example.js

# Comprehensive usage example
node example/usage-example.js
```

## Examples

### test-example.js
A simple test that verifies all APIs are working:
- Dictionary API
- Open Library API  
- Google Books API
- Google AI (Gemini) API

### usage-example.js
A comprehensive example showing real-world usage:
- Research topics using multiple APIs
- Look up technical definitions
- Get AI-powered coding help
- Error handling and best practices

## Features Demonstrated

- ✅ Dictionary lookups
- ✅ Book searches (Open Library & Google Books)
- ✅ AI-powered assistance (Google Gemini)
- ✅ Error handling
- ✅ Async/await patterns
- ✅ Real-world usage scenarios

## Requirements

- Node.js 16+
- Internet connection for API calls
- Google API key (optional, for AI features)