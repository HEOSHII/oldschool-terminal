import setVolume from './setVolume';
import renderAnswerGPT from './renderAnswerGPT';
import renderImageByPrompt from './renderImageByPrompt';

import { doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase.js';

const exitChat = display => {
	display.content.at(-1).lines = [...display.content.at(-1).lines, 'Assistant: – Good bye', 'You left chat'];
	display.inChat = false;
};

const startChat = (command, display) => {
	display.inChat = true;

	display.content = [
		...display.content,
		{
			title: 'Chat started',
			lines: [],
		},
	];

	if (command.split(' ').length === 1) {
		display.content.at(-1).lines = [
			'Assistant: – Welcome to chat. Enter your question and I will try to give you detailed answer',
		];
		return;
	}
	const bodyCommand = command.split(' ').slice(1).join(' ');
	renderAnswerGPT(display, bodyCommand);
};

const notFound = (command, display) => {
	display.content = [
		...display.content,
		{
			title: 'Command not found: ' + command,
			lines: ['Try to enter command HELP for get available commands list'],
			commands: ['help'],
		},
	];
};

const downloadFile = content => {
	const fileLink = document.createElement('a');
	fileLink.href = content.files.src;
	fileLink.setAttribute('download', content.files.name);
	document.body.appendChild(fileLink);
	fileLink.click();
	fileLink.remove();
};

const runCommand = async (command, display) => {
	if (display.inChat) {
		command === 'exit chat' ? exitChat(display) : renderAnswerGPT(command, display);
		return;
	}

	// if (command.split(' ').includes('image')) {
	// 	const prompt = command.split(' ').slice(1).join(' ');
	// 	renderImageByPrompt(prompt, display);
	// 	return;
	// }

	const contentRef = doc(db, 'contents', command);
	const contentSnap = await getDoc(contentRef);
	const content = contentSnap.data();

	if (!content) {
		notFound(command, display);
		return;
	}

	switch (command) {
		case 'chat':
			startChat(command, display);
			return;
		case 'clear':
			display.content = [];
			return;
		case 'download_cv':
			downloadFile(content);
			break;
		case 'sound off':
			setVolume(0);
			break;
		case 'sound volume high':
			setVolume(0.3);
			break;
		case 'sound volume low':
			setVolume(0.1);
			break;
	}
	display.content = [...display.content, content];
};

export default runCommand;
