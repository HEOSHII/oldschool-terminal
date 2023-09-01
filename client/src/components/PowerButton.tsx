import useTerminalStore from '../zustand/useTerminalStore';
import React, { useEffect } from 'react';
import Button from './Button';
import { FaPowerOff } from 'react-icons/fa';

const PowerButton = () => {
	const {
		power,
		powerOn,
		powerOff,
		addContentToTerminal,
		addContentToTerminalOneByOne,
		clearTerminalContent,
		setBusy,
	} = useTerminalStore();
	const handleTogglePower = () => (power ? powerOff() : powerOn());

	useEffect(() => {
		if (!power) {
			clearTerminalContent();
			return;
		}
		setBusy(true);

		addContentToTerminal('Powering on...');
		setTimeout(() => {
			addContentToTerminal('Welcome to the:');
		}, 1000);

		setTimeout(() => {
			addContentToTerminal('████████╗███████╗██████╗░███╗░░░███╗██╗███╗░░██╗░█████╗░██╗░░░░░');
			addContentToTerminal('╚══██╔══╝██╔════╝██╔══██╗████╗░████║██║████╗░██║██╔══██╗██║░░░░░');
			addContentToTerminal('░░░██║░░░█████╗░░██████╔╝██╔████╔██║██║██╔██╗██║███████║██║░░░░░');
			addContentToTerminal('░░░██║░░░██╔══╝░░██╔══██╗██║╚██╔╝██║██║██║╚████║██╔══██║██║░░░░░');
			addContentToTerminal('░░░██║░░░███████╗██║░░██║██║░╚═╝░██║██║██║░╚███║██║░░██║███████╗');
			addContentToTerminal('░░░╚═╝░░░╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝╚═╝╚═╝░░╚══╝╚═╝░░╚═╝╚══════╝');
		}, 1500);

		setTimeout(() => {
			addContentToTerminalOneByOne([
				'\u00A0',
				'Author: HEOSHII (George Shyriaiev)',
				'Version: 2.0',
				'\u00A0',
				'\u00A0',
				'Type "help" to get started.',
			]);
		}, 1800);
	}, [power, clearTerminalContent, addContentToTerminalOneByOne, addContentToTerminal, setBusy]);

	return <Button active={power} powerIgnore value={<FaPowerOff className="text-lg" />} onClick={handleTogglePower} />;
};

export default PowerButton;
