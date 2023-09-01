import { useCallback, useEffect } from 'react';
import { THEMES_LIST } from '../constants/themes';
import useTerminalStore from '../zustand/useTerminalStore';
import { sendMessages } from '../services/API.services';

const useRunCommand = () => {
	const {
		terminalInput,
		addContentToTerminal,
		addContentToTerminalOneByOne,
		clearTerminalContent,
		powerOff,
		setTerminalInput,
		sound,
		toggleSound,
		theme,
		setTheme,
		inChat,
		setInChat,
		setBusy,
		chatHistory: messages,
		addUserMessageToChatHistory,
		addAssistantMessageToChatHistory,
	} = useTerminalStore();

	const runCommand = () => {
		const [main, ...args] = terminalInput.split(' ');
		const commandName = main.toLowerCase();

		if (inChat) {
			addContentToTerminal('- You: ' + terminalInput);
			addUserMessageToChatHistory(terminalInput);
			return;
		}

		addContentToTerminal('\u00A0');
		addContentToTerminal(commandName + ' ' + args.join(' '));

		switch (commandName) {
			case 'help':
				addContentToTerminalOneByOne([
					'Available commands: ',
					'help - show available commands',
					'chat - start chat with assistant',
					'info - show info about your browser',
					'theme <theme_name> - change theme',
					'sound <on|off> - toggle sound',
					'clear - clear terminal content',
					'exit - exit terminal',
				]);
				break;
			case 'chat':
				setInChat(true);

				break;

			case 'info':
				addContentToTerminalOneByOne([
					'Name: ' + navigator.appName,
					'OS: ' + navigator.platform,
					'Browser: ' + navigator.userAgent,
					'Language: ' + navigator.language,
					'Online: ' + navigator.onLine,
				]);
				break;
			case 'clear':
				clearTerminalContent();
				break;
			case 'exit':
				setBusy(true);
				addContentToTerminal('Terminal is shutting down...');
				setTimeout(() => {
					setTerminalInput('');
					clearTerminalContent();
					powerOff();
				}, 2000);
				break;
			case 'theme': {
				if (args.length === 0) {
					addContentToTerminal('Theme: ' + theme);
					break;
				}
				const themeName = args[0];
				if (Object.values(THEMES_LIST).includes(themeName)) {
					if (theme === themeName) {
						addContentToTerminal('Theme already set to: ' + themeName);
						break;
					}
					setTheme(themeName);
				} else {
					addContentToTerminalOneByOne(['Theme not found. Available themes: ', ...THEMES_LIST]);
				}
				break;
			}
			case 'sound':
				if (args.length) {
					if (args[0] === 'on' && sound) {
						addContentToTerminal('Sound already on');
						break;
					}
					if (args[0] === 'off' && !sound) {
						addContentToTerminal('Sound already off');
						break;
					}
				}
				toggleSound();
				addContentToTerminal('Sound: ' + (!sound ? 'on' : 'off'));

				break;
			default:
				addContentToTerminalOneByOne([`Command not found: ${terminalInput}`, 'Type "help" to get started.']);
				break;
		}
	};

	const chatGPT = useCallback(async () => {
		setBusy(true);
		try {
			const { content } = await sendMessages(messages);
			addContentToTerminal('- Assistant: ' + content);
			addAssistantMessageToChatHistory(content);

			if (
				messages.at(-1)?.content.toLocaleLowerCase() === 'bye' ||
				messages.at(-1)?.content.toLocaleLowerCase() === 'exit' ||
				messages.at(-1)?.content.toLocaleLowerCase() === 'goodbye' ||
				messages.at(-1)?.content.toLocaleLowerCase() === 'good bye'
			) {
				setInChat(false);
			}
		} catch (error) {
			addContentToTerminalOneByOne([
				'- Assistant: Sorry, I cannot answer this question. Try another one.',
				'Error: ' + error,
			]);
			setInChat(false);
		} finally {
			setBusy(false);
		}
	}, [
		addAssistantMessageToChatHistory,
		addContentToTerminal,
		addContentToTerminalOneByOne,
		messages,
		setBusy,
		setInChat,
	]);

	useEffect(() => {
		if (inChat && messages.at(-1)?.role === 'user') {
			chatGPT();
		}
	}, [chatGPT, inChat, messages]);

	return runCommand;
};

export default useRunCommand;
