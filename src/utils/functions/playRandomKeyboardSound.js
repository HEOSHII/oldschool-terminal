import { keyboardSounds } from '../sound';

export const playRandomKeyboardSound = writer => {
	if (writer.sound) return;
	writer.sound = true;
	keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)].play();
};

export default playRandomKeyboardSound;
