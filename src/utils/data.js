export const commands = {
	help: 'help',
	// cv: 'cv',
	info: 'info',
	experience: 'experience',
	education: 'education',
	skills: 'skills',
	contacts: 'contacts',
	load: 'load',
	clear: 'clear',
	date: 'date',
};

export const content = {
	[commands.date]: {
		title: 'Date:',
		lines: [String(new Date())],
	},
	[commands.help]: {
		title: 'Available Commands:',
		commands: Object.values(commands).map(value => value),
	},
	[commands.info]: {
		title: 'Information about me:',
		lines: [
			'I value openness and friendliness in the team because it helps us achieve better results and develop as professionals',
			'Ready for a challenge because I always aim to improve my skills and become a better front-end developer.',
		],
	},
	[commands.cv]: {
		title: 'CV commands:',
		commands: [commands.education, commands.contacts, commands.info, commands.skills, commands.experience],
	},
	[commands.experience]: {
		title: 'Experience:',
		lines: ['Frontend Developer. Mencodehard. 2022 - now', 'Junior frontend developer. Webloveme. 2021-2021'],
	},
	[commands.education]: {
		title: 'Education:',
		lines: [
			'National University of Telecommunications. Kyiv. (2012-2015)',
			'College of radio electronics. Dnipro. (2008-2012)',
		],
	},
	[commands.contacts]: {
		title: 'Contacts:',
		links: [
			{
				name: 'telegram',
				action: 'https://',
				url: 't.me/heoshii',
			},
			{
				name: 'phone',
				action: 'tel:',
				url: '+38(050)425-72-37',
			},
			{
				name: 'email',
				action: 'mailto:',
				url: 'george.shiryaev@gmail.com',
			},
		],
		// lines: ['telegram: t.me/heoshii', 'phone: +38(050)425-72-37', 'email: george.shiryaev@gmail.com'],
	},
	[commands.skills]: {
		title: 'Skills:',
		lines: [
			'HTML, CSS',
			'JS, React, Vue',
			'PHP, Wordpress, Laravel',
			'Gulp',
			'Webpack, Vite',
			'Sass, Less, TailwindCSS',
			'NodeJS',
			'Rest Api',
			'Git',
		],
	},
	[commands.load]: {
		title: 'Download started',
		lines: ['Choose folder for download CV'],
		file: '/src/assets/files/GeorgiiShyriaiev_CV.pdf',
		fileName: 'GeorgiiShyriaiev_CV.pdf',
	},
	[commands.clear]: {
		title: '',
		lines: [],
	},
	init: {
		title: 'Welcome to my terminal',
		lines: [
			'This`s small interactive terminal made with Vue',
			'You cant type some commands and get information what you need',
			'Hope you`ll like it',
			'Enjoy!',
		],
	},
	notFound: {
		title: 'Command not found:',
		lines: ['Try to enter command HELP for get available commands list'],
		commands: [commands.help],
	},
};
