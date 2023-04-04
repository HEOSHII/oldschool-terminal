import { atmosAudio, keyboardSounds } from '../sound';

const setVolume = points => [atmosAudio, ...keyboardSounds].forEach(audio => (audio.volume = points));

export default setVolume;
