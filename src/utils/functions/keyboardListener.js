import { commands } from '../data';

const keyboardListener = (key, input, callCommand) => {
	switch (key) {
		case 'Shift':
		case 'Meta':
		case 'CapsLock':
		case 'Alt':
		case 'Control':
		case 'Escape':
			return;
		case 'Tab':
			const autocompletes = Object.values(commands).filter(value => new RegExp(`^${input.value}`).test(value));
			if (!autocompletes.length) return;
			if (autocompletes.length === 1) {
				input.value = autocompletes[0];
			}
			return;
		case 'ArrowUp':
			if (!input.history.length || input.searchIndex === input.history.length - 1) return;
			input.searchIndex++;
			input.value = input.history.at(input.searchIndex);
			return;
		case 'ArrowDown':
			if (!input.history.length || input.searchIndex <= 0) return;
			input.searchIndex--;
			input.value = input.history.at(input.searchIndex);
			return;
		case 'ArrowLeft':
			if (input.caretIndex === -1) {
				input.caretIndex = input.value.length - 1;
				return;
			}
			if (input.caretIndex === 0) return;
			input.caretIndex--;
			return;
		case 'ArrowRight':
			if (input.caretIndex === input.value.length - 1) {
				input.caretIndex = -1;
				return;
			}
			if (input.caretIndex === -1) return;
			input.caretIndex++;
			return;
		case 'Enter':
			if (!input.value) return;
			const command = input.value.trim().toLowerCase();
			input.history = [input.value, ...input.history];
			input.searchIndex = -1;
			input.caretIndex = -1;
			input.value = '';
			callCommand(command);
			return;
		case 'Delete':
			if (input.value.length === 1) {
				input.value = '';
				input.caretIndex = -1;
				return;
			}
			if (input.caretIndex === -1) return;
			if (input.caretIndex === 0) {
				input.value = input.value.replace(/^./, '');
				return;
			}

			input.value = input.value
				.split('')
				.filter((char, index) => index !== input.caretIndex + 1)
				.join('');

			break;
		case 'Backspace':
			if (input.caretIndex === 0) return;
			if (input.caretIndex === -1) {
				input.value = input.value.replace(/.$/, '');
				return;
			}

			input.value = input.value
				.split('')
				.filter((char, index) => index !== input.caretIndex - 1)
				.join('');

			input.caretIndex--;

			break;
		case ' ':
			if (!input.value || (input.caretIndex === -1 && input.value.at(-1) === ' ')) return;
			if (input.value.at(input.caretIndex - 1) === ' ' || input.value.at(input.caretIndex) === ' ') return;
		default:
			if (input.caretIndex === -1) {
				input.value += key;
				return;
			}
			if (input.caretIndex === 0) {
				input.value = [key, ...input.value.split('')].join('');
				input.caretIndex++;
				return;
			}
			input.value = [
				...input.value.split('').slice(0, input.caretIndex),
				key,
				...input.value.split('').slice(input.caretIndex),
			].join('');
			input.caretIndex++;
	}
};

export default keyboardListener;
