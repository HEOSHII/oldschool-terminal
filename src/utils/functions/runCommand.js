import { content, commands } from '../data';
import setVolume from './setVolume';
import renderAnswer from './renderAnswer';

const runCommand = async (command, render) => {
	const primaryCommand = command.split(' ').at(0);

	if (
		!Object.values(commands)
			.map(value => value)
			.includes(primaryCommand)
	) {
		render.content = [
			...render.content,
			{
				...content.notFound,
				title: content.notFound.title + ' ' + primaryCommand,
			},
		];
		return;
	}

	if (command.split(' ').includes(commands.chat) && command.split(' ').length > 1) {
		const bodyCommand = command
			.split(' ')
			.filter((item, index) => index !== 0)
			.join(' ');

		return renderAnswer(render, bodyCommand);
	}

	switch (command) {
		case commands.download:
			const fileLink = document.createElement('a');
			fileLink.href = content[command].file;
			fileLink.setAttribute('download', content[command].fileName);
			document.body.appendChild(fileLink);
			fileLink.click();
			fileLink.remove();
			break;
		case commands.clear:
			render.content = [];
			return;
		case commands.soundsOff:
			setVolume(0);
			break;
		case commands.volumeHigh:
			setVolume(0.3);
			break;
		case commands.volumeLow:
			setVolume(0.1);
			break;
	}

	render.content = [...render.content, content[command]];
};

export default runCommand;
