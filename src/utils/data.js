export const commands = {
	help: 'help',
	show: 'show',
	info: 'show info',
	experience: 'show experience',
	education: 'show education',
	skills: 'show skills',
	contacts: 'show contacts',
	date: 'show date',
	download: 'download_cv',
	sound: 'sound',
	soundsOff: 'sound off',
	volumeHigh: 'sound volume high',
	volumeLow: 'sound volume low',
	chat: 'chat',
	clear: 'clear',
};

export const content = {
	[commands.date]: {
		title: 'Date:',
		lines: [String(new Date())],
	},
	[commands.help]: {
		title: 'Available Commands:',
		commands: Object.values(commands).map(value => value),
		lines: ['You can enter whatever you want after command CHAT and OpenAI will give you an answer'],
	},
	[commands.show]: {
		title: 'Show commands:',
		commands: [
			commands.info,
			commands.experience,
			commands.skills,
			commands.education,
			commands.contacts,
			commands.date,
		],
	},
	[commands.info]: {
		title: 'Little bit about me:',
		lines: [
			'My name is George, I`m from Ukraine and I`m a frontend developer',
			'I value openness and friendliness in the team because it helps achieve better results and develop as a professional',
			'Ready for a challenge because I always aim to improve my skills and become a better front-end developer',
		],
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
	[commands.download]: {
		title: 'The download has started',
		lines: ['Choose folder for download CV'],
		file: '/src/assets/files/GeorgiiShyriaiev_CV.pdf',
		fileName: 'GeorgiiShyriaiev_CV.pdf',
	},
	[commands.clear]: {
		title: '',
		lines: [],
	},
	[commands.sound]: {
		title: 'Sound controls:',
		commands: [commands.soundsOff, commands.volumeHigh, commands.volumeLow],
	},
	[commands.soundsOff]: {
		title: '',
		lines: ['Sound turned OFF'],
	},
	[commands.volumeHigh]: {
		title: '',
		lines: ['Volume changed to HIGH'],
	},
	[commands.volumeLow]: {
		title: '',
		lines: ['Volume changed to LOW'],
	},
	[commands.answer]: {
		title: 'Answer:',
		image: '',
	},
	[commands.chat]: {
		title: 'ChatGPT',
		lines: ['You can enter whatever you want after command CHAT and OpenAI will give you an answer', 'For example:'],
		commands: [commands.chat + ' Hi there ChatGPT. Can you help me with one thing?'],
	},
	init: {
		title: 'Welcome to my terminal',
		lines: [
			'This`s small interactive terminal made on Vue',
			'You can enter some commands and get information what you need',
			'Try typing a HELP command first (case not important)',
			'Also, you can enter whatever you want after command CHAT and OpenAI will answer to you',
			'Hope you`ll like it',
			'Enjoy!',
		],
	},
	notFound: {
		title: 'Command not found:',
		lines: ['Try to enter command HELP for get available commands list'],
		commands: [commands.help],
	},
	toShortQuestion: {
		lines: ['Your question is too short'],
	},
};

export const keyboardSounds = [
	new Audio('/src/assets/sounds/keyboard/keys_1.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_2.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_3.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_4.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_5.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_6.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_7.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_8.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_9.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_10.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_11.mp3'),
	new Audio('/src/assets/sounds/keyboard/keys_12.mp3'),
];

export const atmosAudio = new Audio('/src/assets/sounds/comp/atmos.mp3');

[atmosAudio, ...keyboardSounds].forEach(audio => (audio.volume = 0));
atmosAudio.autoplay = atmosAudio.loop = true;
