// import { commands } from '../data';
import inputNormalize from './inputNormalize';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase.js';

const resetInput = input => {
	input.searchIndex = -1;
	input.caretIndex = -1;
	input.value = '';
	input.busy = false;
};

let commands = [];
(async () => {
	const commandsSnap = await getDocs(collection(db, 'contents'));
	commands = commandsSnap.docs.map(command => command.id);
})();

const keyboardListener = (key, input, callCommand, display) => {
	if (display.busy) return;
	switch (key) {
		case 'Shift':
		case 'Meta':
		case 'CapsLock':
		case 'Alt':
		case 'Control':
		case 'Escape':
			return;

		case 'Tab':
			let autocompletes;
			input.value = inputNormalize(input.value);
			if (input.value.split(' ').length === 1) {
				const singleCommands = [...new Set(commands.map(command => command.split(' ')[0]))];
				autocompletes = singleCommands.filter(value => new RegExp(`^${input.value}`).test(value));
			} else {
				autocompletes = commands.filter(value => new RegExp(`^${input.value}`).test(value));
			}
			if (autocompletes.length > 0) {
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
			input.value = inputNormalize(input.value);
			if (input.caretIndex === -1) {
				input.caretIndex = input.value.length - 1;
				return;
			}
			if (input.caretIndex === 0) return;
			input.caretIndex--;
			return;

		case 'ArrowRight':
			input.value = inputNormalize(input.value);
			if (input.caretIndex === input.value.length - 1) {
				input.caretIndex = -1;
				return;
			}
			if (input.caretIndex === -1) return;
			input.caretIndex++;
			return;

		case 'Enter':
			if (!input.value) return;
			input.busy = true;
			input.value = inputNormalize(input.value);
			input.history = [input.value, ...input.history];
			callCommand(input.value);
			resetInput(input);
			return;

		case 'Delete':
			input.value = inputNormalize(input.value);
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
