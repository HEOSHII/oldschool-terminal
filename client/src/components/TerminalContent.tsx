import useTerminalStore from '../zustand/useTerminalStore';
import { useRef, useEffect } from 'react';
import TypingText from './TypingText';

const TerminalContent = () => {
	const { terminalContent } = useTerminalStore();
	const content = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!content.current) return;

		content.current.scrollTop = content.current.scrollHeight;
	}, [terminalContent]);

	return (
		<div className=" pt-[50dvh] pl-20 pr-40 pb-40 h-full overflow-y-scroll" ref={content}>
			{terminalContent.map((content, index) => (
				<TypingText text={content} key={content + '_' + index} />
			))}
		</div>
	);
};

export default TerminalContent;
