<div align="center">

<img src="https://github.com/abdxdev/ai-regex-search/blob/main/media/icon.png?raw=true" height="150" />

<h1 align="center">AI Regex Search</h1>

[![License](https://img.shields.io/github/license/abdxdev/ai-regex-search?style=flat-square&logo=GNU&label=License)](https://github.com/abdxdev/ai-regex-search/tree/main)
[![GitHub Issues](https://img.shields.io/github/issues/abdxdev/ai-regex-search.svg?style=flat-square&label=Issues&color=FF70A7)](https://github.com/abdxdev/ai-regex-search/issues)
[![Last Commit](https://img.shields.io/github/last-commit/abdxdev/ai-regex-search.svg?style=flat-square&label=Last%20Commit&color=A06EE1)](https://github.com/abdxdev/ai-regex-search/tree/main)

</div>

AI Regex Search is a VS Code extension that converts natural language descriptions into regular expressions using Google's Gemini AI. Simply describe the pattern you want to find, and let AI generate the perfect regex for your search.

![Demo](https://github.com/abdxdev/ai-regex-search/blob/main/media/other/demo.gif?raw=true)

## Note

To use the AI Regex Search extension:

1. Get a Google Generative AI API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Set the API key in the extension settings to enable regex generation
3. Use the command palette to convert your descriptions into regex patterns

## Features

- **AI-Powered Regex Generation:** Convert natural language descriptions into precise regular expressions
- **VS Code Integration:** Automatically opens search with the generated regex pattern
- **Multiple AI Models:** Choose from different Gemini models for optimal results
- **Instant Search:** Generated patterns are immediately ready to use in VS Code's search
- **Pattern Validation:** Ensures generated regex patterns are valid and VS Code-compatible
- **User-Friendly:** No regex expertise required - just describe what you want to find

## Requirements

- Visual Studio Code v1.60.0 or higher
- A Google Generative AI API key from [Google AI Studio](https://aistudio.google.com/apikey)
- Active internet connection for AI pattern generation

## How to Use

1. **Install and Setup:**
   - Install the extension from VS Code Marketplace
   - Configure your Gemini API key in VS Code settings
   - Optionally select your preferred Gemini model

2. **Generate Regex Patterns:**
   - Open Command Palette (Ctrl+Shift+P / Cmd+Shift+P)
   - Type "AI Regex Search: Convert AI Description to Regex"
   - Enter your pattern description
   - Watch as the AI generates your regex pattern

3. **Search Your Code:**
   - The Find dialog opens automatically with your pattern
   - Regex mode is enabled by default
   - Navigate through matches in your code

## Extension Settings

This extension provides the following settings:

- `abdxdev.geminiApiKey`: Your Google Generative AI API key
- `abdxdev.geminiModel`: Model to use for pattern generation (default: gemini-2.0-flash-001)

## Commands

Access these commands through the Command Palette (Ctrl+Shift+P / Cmd+Shift+P):

- **AI Regex Search: Convert AI Description to Regex** - Generate a regex pattern from your description
- **abdxdev: Set Gemini API Key** - Configure your API key

## Example Use Cases

- Find email addresses in your codebase
- Search for specific URL patterns
- Locate phone numbers with various formats
- Find HTML tags with specific attributes
- Match dates in specific formats
- Search for function declarations
- Find variable naming patterns

## Contributing

Found a bug or have a suggestion? Please feel free to:

1. Open an issue on [GitHub](https://github.com/abdxdev/ai-regex-search/issues)
2. Submit a pull request with your improvements
3. Share your feedback and ideas

## Repository

Find the source code and contribute on [GitHub](https://github.com/abdxdev/ai-regex-search).
