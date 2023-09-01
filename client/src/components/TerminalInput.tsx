import { useEffect, useMemo } from 'react';
import useTerminalScreenStore from '../zustand/useTerminalStore';
import useKeyListener from '../hooks/useKeyListener';

export const TerminalInput = () => {
	const [keyListener, cursorIndex] = useKeyListener();

	const { terminalInput } = useTerminalScreenStore();

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		window.addEventListener('keydown', keyListener);

		return () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			window.removeEventListener('keydown', keyListener);
		};
	}, [keyListener]);

	const input = useMemo(() => {
		return terminalInput.split('').map((symbol, index) => {
			return (
				<p
					key={symbol + '_' + index}
					className={`block ${
						index === cursorIndex ? 'text-black bg-terminal-main-primary' : 'text-terminal-main-primary'
					}`}
				>
					{symbol === ' ' ? '\u00A0' : symbol}
				</p>
			);
		});
	}, [terminalInput, cursorIndex]);

	return (
		<div className="w-full flex text-terminal-main-primary pl-10 py-5 bg-black text-2xl absolute bottom-0 left-0 ">
			<p className="mr-1">{'>'}</p>

			{input}
			{cursorIndex === terminalInput.length && (
				<span className=" text-terminal-main-primary bg-terminal-main-primary">{'\u00A0'}</span>
			)}
		</div>
	);
};
