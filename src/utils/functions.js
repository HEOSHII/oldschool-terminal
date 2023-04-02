import { commands, content } from './data';

export const keyboardListener = (key, input, callCommand) => {
	switch (key) {
		case 'Shift':
		case 'Meta':
		case 'CapsLock':
		case 'Alt':
		case 'Control':
		case 'Escape':
			return;
		case 'Tab':
			const variants = Object.values(commands).filter(value => new RegExp(`^${input.value}`).test(value));
			if (!variants.length) return;
			if (variants.length === 1) {
				input.value = variants[0];
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

export const runCommand = (command, render) => {
	if (command === commands.clear) {
		render.content = [];
		return;
	}
	if (
		!Object.values(commands)
			.map(value => value)
			.includes(command)
	) {
		render.content = [
			...render.content,
			{
				...content.notFound,
				title: content.notFound.title + ' ' + command,
			},
		];
		return;
	}
	if (Object.keys(content[command]).includes('file')) {
		const fileLink = document.createElement('a');
		fileLink.href = content[command].file;
		fileLink.setAttribute('download', content[command].fileName);
		document.body.appendChild(fileLink);
		fileLink.click();
		fileLink.remove();
	}
	render.content = [...render.content, content[command]];
};
