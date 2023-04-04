// import { commands } from '../data';
import setVolume from './setVolume';
import renderAnswerGPT from './renderAnswerGPT';

import { getFirestore, collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore/lite';
import { db } from '../firebase/firebase.js';

const exitChat = render => {
	render.content.at(-1).lines = [...render.content.at(-1).lines, 'ChatGTP: – Good bye', 'You left chat'];
	render.inChat = false;
};

const startChat = (command, render) => {
	render.inChat = true;

	render.content = [
		...render.content,
		{
			title: 'Chat started',
			lines: [],
		},
	];

	if (command.split(' ').length === 1) {
		render.content.at(-1).lines = [
			'Assistant: – Welcome to chat. Enter your question and I will try to give you detailed answer',
		];
		return;
	}
	const bodyCommand = command.split(' ').slice(1).join(' ');
	renderAnswerGPT(render, bodyCommand);
};

const notFound = async (command, render) => {
	const docRef = doc(db, 'contents', 'notFound');
	const docSnap = await getDoc(docRef);
	render.content = [...render.content, { ...docSnap.data(), title: docSnap.data().title + ' ' + command }];
};

const downloadFile = content => {
	const fileLink = document.createElement('a');
	fileLink.href = content.files.src;
	fileLink.setAttribute('download', content.files.name);
	document.body.appendChild(fileLink);
	fileLink.click();
	fileLink.remove();
};

const runCommand = async (command, render) => {
	if (render.inChat) {
		command === 'exit chat' ? exitChat(render) : renderAnswerGPT(render, command);
		return;
	}

	const contentRef = doc(db, 'contents', command);
	const contentSnap = await getDoc(contentRef);
	const content = contentSnap.data();

	if (!content) {
		notFound(command, render);
		return;
	}

	switch (command) {
		case 'chat':
			startChat(command, render);
			return;
		case 'clear':
			render.content = [];
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
	render.content = [...render.content, content];
};

export default runCommand;
