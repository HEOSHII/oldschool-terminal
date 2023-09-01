import TerminalScreen from './components/TerminalScreen';

import ThemeChangerButton from './components/ThemeChangerButton';
import PowerButton from './components/PowerButton';
import ClearTerminalButton from './components/ClearTerminalButton';
import SoundToggleButton from './components/SoundToggleButton';
import { useEffect } from 'react';
import useTerminalStore from './zustand/useTerminalStore';
import { playAtmosSound, setMuteAll } from './constants/sounds';
import ChatToggleButton from './components/ChatToggleButton';

function App() {
	const { theme, sound, power } = useTerminalStore();

	useEffect(() => {
		if (power) {
			playAtmosSound();
		}
	}, [power]);

	useEffect(() => {
		const muted = !sound || !power;
		setMuteAll(muted);
	}, [power, sound]);

	return (
		<main
			className="flex justify-center items-center w-screen h-screen p-10 bg-metal bg-no-repeat bg-center bg-[cover]"
			data-theme={theme}
		>
			<TerminalScreen />
			<div className="flex flex-col gap-5 relative z-0">
				<PowerButton />
				<div></div>
				<ChatToggleButton />
				<ThemeChangerButton />
				<SoundToggleButton />
				<div className="h-3"></div>
				<ClearTerminalButton />
			</div>
		</main>
	);
}

export default App;
