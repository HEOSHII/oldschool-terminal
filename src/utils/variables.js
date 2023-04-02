export const commands = {
	help: 'help',
	experience: 'show exp',
	education: 'show education',
	clear: 'clear',
	cv: 'load cv',
};

export const content = {
	[commands.help]: {
		title: 'Command list',
		lines: Object.keys(commands).map(key => commands[key]),
	},
	[commands.experience]: {
		title: 'Experience',
		lines: ['Frontend Developer. Mencodehard. 2022 - now', 'Junior frontend developer. Webloveme. 2021-2021.'],
	},
	[commands.education]: {
		title: 'Education',
		lines: [
			'National University of Telecommunications. Kyiv. (2012-2015)',
			'College of radio electronics. Dnipro. (2008-2012)',
		],
	},
	[commands.cv]: {
		title: 'Download started',
		lines: ['Choose folder for download CV.'],
		file: '/src/assets/files/GeorgiiShyriaiev_CV.pdf',
		fileName: 'GeorgiiShyriaiev_CV.pdf',
	},
	[commands.clear]: {
		title: '',
		lines: [],
	},
	default: {
		title: 'Command not found',
		lines: ['Type command HELP to get list of actual commands'],
	},
};
