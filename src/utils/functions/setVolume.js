import { atmosAudio, keyboardSounds } from '../data';

const setVolume = points => [atmosAudio, ...keyboardSounds].forEach(audio => (audio.volume = points));

export default setVolume;
