import { playKeyboardSound } from '../constants/sounds';
import { FC, useEffect, useState } from 'react';

type TypingTextProps = {
	text: string;
	delay?: number;
};

const TypingText: FC<TypingTextProps> = ({ text, delay = 5 }) => {
	const [currentText, setCurrentText] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (currentIndex === text.length) {
				clearInterval(interval);
				return;
			}
			setCurrentText(value => value + text[currentIndex]);
			setCurrentIndex(value => value + 1);
			playKeyboardSound();
		}, delay);
		return () => clearInterval(interval);
	}, [currentIndex, delay, text]);

	return <p className="text-2xl leading-[1]">{currentText}</p>;
};

export default TypingText;
