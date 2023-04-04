export const keyboardSounds = [
	new Audio('./sounds/keyboard/keys_1.mp3'),
	new Audio('./sounds/keyboard/keys_2.mp3'),
	new Audio('./sounds/keyboard/keys_3.mp3'),
	new Audio('./sounds/keyboard/keys_4.mp3'),
	new Audio('./sounds/keyboard/keys_5.mp3'),
	new Audio('./sounds/keyboard/keys_6.mp3'),
	new Audio('./sounds/keyboard/keys_7.mp3'),
	new Audio('./sounds/keyboard/keys_8.mp3'),
	new Audio('./sounds/keyboard/keys_9.mp3'),
	new Audio('./sounds/keyboard/keys_10.mp3'),
	new Audio('./sounds/keyboard/keys_11.mp3'),
	new Audio('./sounds/keyboard/keys_12.mp3'),
];

export const atmosAudio = new Audio('./sounds/comp/atmos.mp3');

[atmosAudio, ...keyboardSounds].forEach(audio => (audio.volume = 0));
atmosAudio.autoplay = atmosAudio.loop = true;
