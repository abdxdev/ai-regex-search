import * as vscode from 'vscode';
import { GoogleGenAI } from '@google/genai';

export function activate(context: vscode.ExtensionContext) {
	console.log('AI Regex Search extension is now active');

	const disposable = vscode.commands.registerCommand('ai-regex-search.convertToRegex', async () => {
		try {
			const config = vscode.workspace.getConfiguration('abd-dev');
			let apiKey = config.get<string>('geminiApiKey');
			const selectedModel = config.get<string>('geminiModel') || 'gemini-2.0-flash-001';

			if (!apiKey) {
				apiKey = await vscode.window.showInputBox({
					prompt: 'Enter your Google Gemini API key',
					placeHolder: 'API key',
					password: true,
					ignoreFocusOut: true
				});

				if (!apiKey) {
					vscode.window.showWarningMessage('API key is required to use AI Regex Search');
					return;
				}

				await config.update('geminiApiKey', apiKey, vscode.ConfigurationTarget.Global);
				vscode.window.showInformationMessage('Gemini API key saved successfully');
			}

			console.log(`Using model: ${selectedModel}`);

			const description = await vscode.window.showInputBox({
				prompt: 'Describe the pattern you want to search for',
				placeHolder: 'e.g., email addresses, phone numbers with country code, URLs containing "example.com"',
				ignoreFocusOut: true
			});
			if (!description) {
				return;
			}

			await vscode.window.withProgress({
				location: vscode.ProgressLocation.Notification,
				title: 'Converting to regex...',
				cancellable: false
			}, async (progress) => {
				try {
					const ai = new GoogleGenAI({ apiKey });
					const model = ai.models.generateContent({
						model: selectedModel,
						contents: [
							{
								role: 'user',
								parts: [
									{
										text: `Convert this AI description to a precise regular expression pattern:
										"${description}"
										
										Important rules:
										1. Create a regex pattern ONLY compatible with VS Code's search functionality
										2. VS Code uses JavaScript regex engine with some differences:
										   - No lookbehind assertions (they're not supported in VS Code search)
										   - Avoid non-standard regex features
										   - Be mindful of escaping characters correctly for VS Code
										3. The pattern should be as precise as possible while ensuring VS Code compatibility
										4. Do NOT include regex delimiters (like / or /) at the beginning and end
										
										Here are examples of valid regex patterns for VS Code:
										
										Description: "Find email addresses"
										Valid regex: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}
										
										Description: "Find URLs with http or https"
										Valid regex: https?://[\\w-]+(\\.[\\w-]+)+([\\w.,@?^=%&:/~+#-]*[\\w@?^=%&/~+#-])?
										
										Description: "Find function declarations in JavaScript"
										Valid regex: function\\s+([a-zA-Z_$][\\w$]*)\\s*\\([^)]*\\)\\s*\\{
										
										Description: "Find HTML tags with class attribute"
										Valid regex: <([a-z][a-z0-9]*)\\b[^>]*class=["']([^"']+)["'][^>]*>
										
										Description: "Find phone numbers with country code"
										Valid regex: \\+[1-9]\\d{0,2}[\\s-]?\\(?\\d{3}\\)?[\\s-]?\\d{3}[\\s-]?\\d{4}
										
										Based on these examples, generate ONLY the regex pattern for my request. No explanation, no markdown formatting, no additional text.
										`
									}
								]
							}
						]
					});

					const result = await model;
					const regexPattern = result.text?.trim();
					if (!regexPattern) {
						throw new Error('Failed to generate regex pattern');
					}

					const cleanPattern = regexPattern
						.replace(/^```([a-z]*\n?|\n)?|```$/g, '')
						.replace(/^\/|\/[gimsuy]*$/g, '')
						.trim();

					console.log('Generated pattern:', cleanPattern);

					try {
						new RegExp(cleanPattern);
					} catch (regexError) {
						throw new Error(`Invalid regex pattern generated: ${regexError instanceof Error ? regexError.message : 'Unknown error'}`);
					}

					await openFindWithRegex(cleanPattern);

					vscode.window.showInformationMessage(`Regex pattern generated: ${cleanPattern}`);
				} catch (error) {
					if (error instanceof Error) {
						vscode.window.showErrorMessage(`Error generating regex: ${error.message}`);
					} else {
						vscode.window.showErrorMessage('An unknown error occurred');
					}
				}
			});
		} catch (error) {
			if (error instanceof Error) {
				vscode.window.showErrorMessage(`Error: ${error.message}`);
			} else {
				vscode.window.showErrorMessage('An unknown error occurred');
			}
		}
	});

	const setApiKeyCommand = vscode.commands.registerCommand('abd-dev.setApiKey', async () => {
		const apiKey = await vscode.window.showInputBox({
			prompt: 'Enter your Google Gemini API key',
			placeHolder: 'API key',
			password: true,
			ignoreFocusOut: true
		});

		if (apiKey) {
			const config = vscode.workspace.getConfiguration('abd-dev');
			await config.update('geminiApiKey', apiKey, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage('Gemini API key saved successfully');
		}
	});

	context.subscriptions.push(disposable, setApiKeyCommand);
}

async function openFindWithRegex(pattern: string): Promise<void> {
	await vscode.commands.executeCommand('actions.find');
	await new Promise(resolve => setTimeout(resolve, 100));
	await vscode.commands.executeCommand('editor.actions.findWithArgs', {
		searchString: pattern,
		isRegex: true,
		isCaseSensitive: false,
		isWholeWord: false
	});
}

export function deactivate() { }
