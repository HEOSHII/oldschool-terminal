import { storage } from './firebase/firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

export const keyboardSounds = [];

export const atmosAudio = new Audio();
atmosAudio.autoplay = atmosAudio.loop = true;

(async () => {
	const atmosUrl = await getDownloadURL(ref(storage, 'atmos.mp3'));
	atmosAudio.src = atmosUrl;
	const { items } = await listAll(ref(storage, `keyboard_sounds`));
	for (const item of items) {
		const soundUrl = await getDownloadURL(item);
		const keySound = new Audio(soundUrl);
		keySound.volume = 0;
		keyboardSounds.push(keySound);
	}
})();

[atmosAudio, ...keyboardSounds].forEach(audio => (audio.volume = 0));
