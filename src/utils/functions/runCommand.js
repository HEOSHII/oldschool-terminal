import setVolume from './setVolume';
import renderAnswerGPT from './renderAnswerGPT';
import { ref, getDownloadURL } from 'firebase/storage';

import { doc, getDoc } from 'firebase/firestore/lite';
import { db, storage } from '../firebase/firebase';

const exitChat = display => {
	display.content.at(-1).lines = [...display.content.at(-1).lines, 'OpenAI: – Good bye', 'You left chat'];
	display.inChat = false;
};

const startChat = (command, display) => {
	display.inChat = true;

	display.content = [
		...display.content,
		{
			title: 'ChatGPT started',
			lines: [],
		},
	];

	if (command.split(' ').length === 1) {
		display.content.at(-1).lines = [
			'OpenAI: – Welcome to chat. Enter your question and I will try to give you detailed answer',
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
			lines: ["Enter command 'help' to get available commands list"],
			commands: ['help'],
		},
	];
};

const runCommand = async (command, display) => {
	if (display.inChat) {
		command === 'exit' ? exitChat(display) : renderAnswerGPT(command, display);
		return;
	}

	const mainCommand = command.split(' ').at(0);

	const contentRef = doc(db, 'contents', mainCommand);
	const contentSnap = await getDoc(contentRef);
	const content = contentSnap.data();

	if (!content) {
		notFound(mainCommand, display);
		return;
	}

	switch (mainCommand) {
		case 'chat':
			startChat(mainCommand, display);
			return;
		case 'clear':
			display.content = [];
			return;
		case 'download_cv':
			downloadFile();
			break;
		case 'sound off':
			setVolume(0);
			break;
		case 'sound on':
			setVolume(0.15);
			break;
	}
	display.content = [...display.content, content];
};

export default runCommand;
