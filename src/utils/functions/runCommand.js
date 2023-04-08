import setVolume from './setVolume';
import renderAnswerGPT from './renderAnswerGPT';
import { ref, getDownloadURL } from 'firebase/storage';

import { doc, getDoc } from 'firebase/firestore/lite';
import { db, storage } from '../firebase/firebase';
import { THEMES } from '../constants';

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
			lines: ['Try to enter command HELP for get available commands list'],
			commands: ['help'],
		},
	];
};

const downloadFile = async () => {
	const fileLink = document.createElement('a');
	const fileUrl = await getDownloadURL(ref(storage, 'GeorgiiShyriaiev_CV.pdf'));
	fileLink.href = fileUrl;
	fileLink.target = '_blank';
	fileLink.setAttribute('download', 'GeorgiiShyriaiev_CV.pdf');
	document.body.appendChild(fileLink);
	fileLink.click();
	fileLink.remove();
};

const runCommand = async (command, display) => {
	if (display.inChat) {
		command === 'exit' ? exitChat(display) : renderAnswerGPT(command, display);
		return;
	}


	if (command.split(' ').includes('theme') && command.split(' ').length > 1) {
		const theme = command.split(' ').at(-1);
		if (!Object.values(THEMES).includes(theme)) {
			display.content = [...display.content, { title: 'Theme not found: ' + theme }];
			return;
		}
		display.theme = theme;
		display.content = [...display.content, { title: 'Theme changed to: ' + theme }];
		return;
	}

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
