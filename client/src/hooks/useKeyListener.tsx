import { useState } from 'react';
import { COMMANDS_LIST } from '../constants/commands';
import useTerminalStore from '../zustand/useTerminalStore';
import useRunCommand from './useRunCommand';

const useKeyListener = () => {
	const { terminalInput, setTerminalInput, addCommandToHistory, commandsHistory, busy } = useTerminalStore();

	const [cursorIndex, setCursorIndex] = useState(0);
	const [historyIndex, setHistoryIndex] = useState(0);
	const runCommand = useRunCommand();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const keyListener = (e: any) => {
		e.preventDefault();
		if (busy) return;
		switch (e.key) {
			case 'Shift':
			case 'Control':
			case 'Alt':
			case 'CapsLock':
			case 'Escape':
			case 'Meta':
			case 'Home':
			case 'End':
			case 'PageUp':
			case 'PageDown':
			case 'Insert':
			case 'F1':
			case 'F2':
			case 'F3':
			case 'F4':
			case 'F5':
			case 'F6':
			case 'F7':
			case 'F8':
			case 'F9':
			case 'F10':
			case 'F11':
			case 'F12':
				break;
			case 'Backspace':
				if (cursorIndex <= 0) return;
				setTerminalInput(terminalInput.slice(0, cursorIndex - 1) + terminalInput.slice(cursorIndex));
				setCursorIndex(cursorIndex - 1);
				break;
			case 'Delete':
				if (cursorIndex === terminalInput.length) return;
				setTerminalInput(terminalInput.slice(0, cursorIndex + 1) + terminalInput.slice(cursorIndex + 2));
				break;
			case 'Enter':
				if (!terminalInput) return;
				setTerminalInput('');
				setCursorIndex(0);
				addCommandToHistory(terminalInput);
				setHistoryIndex(commandsHistory.length + 1);
				runCommand();
				break;
			case 'ArrowLeft':
				if (cursorIndex === 0) return;
				setCursorIndex(cursorIndex - 1);
				break;
			case 'ArrowRight':
				if (cursorIndex === terminalInput.length) return;
				setCursorIndex(cursorIndex + 1);
				break;
			case 'ArrowUp':
				if (commandsHistory.length === 0 || historyIndex === 0) return;
				setCursorIndex(commandsHistory[historyIndex - 1].length);
				setHistoryIndex(prevHistory => prevHistory - 1);
				setTerminalInput(commandsHistory[historyIndex - 1]);
				break;
			case 'ArrowDown':
				if (commandsHistory.length === 0 || historyIndex === commandsHistory.length - 1) return;
				setCursorIndex(commandsHistory[historyIndex - 1].length);
				setHistoryIndex(historyIndex + 1);
				setTerminalInput(commandsHistory[historyIndex + 1]);
				break;
			case 'Tab': {
				const probablyCommand = COMMANDS_LIST.find(command => command.startsWith(terminalInput));
				if (!probablyCommand) return;
				setTerminalInput(probablyCommand);
				setCursorIndex(probablyCommand.length);
				break;
			}
			case ' ':
				if (
					terminalInput[cursorIndex] === ' ' ||
					terminalInput[cursorIndex - 1] === ' ' ||
					(terminalInput[cursorIndex + 1] === ' ' && terminalInput[cursorIndex - 1] === ' ')
				)
					return;
				setTerminalInput(terminalInput.slice(0, cursorIndex) + ' ' + terminalInput.slice(cursorIndex));
				setCursorIndex(cursorIndex + 1);
				break;

			default:
				setHistoryIndex(commandsHistory.length);
				setTerminalInput(terminalInput.slice(0, cursorIndex) + e.key + terminalInput.slice(cursorIndex));
				setCursorIndex(cursorIndex + 1);
				break;
		}
	};
	return [keyListener, cursorIndex];
};

export default useKeyListener;
