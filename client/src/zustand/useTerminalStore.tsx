import { create } from 'zustand';
import { TerminalStoreType } from '../types/store';
import { THEMES } from '../constants/themes';

const useTerminalStore = create<TerminalStoreType>(set => ({
	power: false,
	sound: true,
	busy: false,
	inChat: false,
	terminalContent: [],
	terminalInput: '',
	commandsHistory: [],
	chatHistory: [{ role: 'system', content: `Talk like in the game Fallout  in ${navigator.language} language only` }],
	theme: THEMES.TERMINAL,

	powerOn: () => set({ power: true }),
	powerOff: () =>
		set({
			power: false,
			terminalContent: [],
			busy: false,
			inChat: false,
			terminalInput: '',
			commandsHistory: [],
			chatHistory: [
				{ role: 'system', content: `Talk like in the game Fallout in ${navigator.language} language only` },
			],
		}),
	toggleSound: () =>
		set(state => ({
			sound: !state.sound,
			terminalContent: state.busy
				? state.terminalContent
				: [...state.terminalContent, 'Sound: ' + (!state.sound ? 'on' : 'off')],
		})),
	setTheme: (theme: string) =>
		set(state => ({
			theme,
			terminalContent: state.busy ? state.terminalContent : [...state.terminalContent, 'Theme set to: ' + theme],
		})),
	setBusy: busy => set({ busy }),
	setInChat: inChat =>
		set(state => ({
			inChat,
			...(inChat && {
				terminalContent: [...state.terminalContent, '\u00A0', 'Waiting for assistant...'],
				chatHistory: [...state.chatHistory, { role: 'user', content: 'Hello there' }],
			}),
			...(!inChat && {
				terminalContent: [...state.terminalContent, 'Chat closed.'],
			}),
		})),
	setTerminalInput: input => set({ terminalInput: input }),
	addContentToTerminal: content => set(state => ({ terminalContent: [...state.terminalContent, content] })),
	addContentToTerminalOneByOne: async contentArray => {
		set({ busy: true });
		for (let i = 0; i < contentArray.length; i++) {
			await new Promise(resolve => setTimeout(resolve, i ? contentArray[i - 1].length * 10 : 0));
			set(state => ({ terminalContent: [...state.terminalContent, contentArray[i]] }));
		}
		set({ busy: false });
	},
	addUserMessageToChatHistory: content =>
		set(state => ({ chatHistory: [...state.chatHistory, { role: 'user', content }] })),
	addAssistantMessageToChatHistory: content =>
		set(state => ({ chatHistory: [...state.chatHistory, { role: 'assistant', content }] })),
	clearTerminalContent: () => set({ terminalContent: [], busy: false }),
	addCommandToHistory: command => set(state => ({ commandsHistory: [...state.commandsHistory, command] })),
}));

export default useTerminalStore;
