import { keyboardSounds } from '../data';

export const playRandomKeyboardSound = () => {
	keyboardSounds[Math.floor(Math.random() * keyboardSounds.length)].play();
};

export default playRandomKeyboardSound;