import axios from 'axios';

const renderAnswer = async (render, command) => {
	try {
		render.content.at(-1).lines = [
			...render.content.at(-1).lines,
			'You: – ' + firstLetterUppercase(command),
			'ChatGPT: * Thinking... *',
		];
		const { data } = await axios.post(import.meta.env.VITE_CHATGPT_API, { question: command });
		render.content.at(-1).lines = [...render.content.at(-1).lines, 'ChatGPT: – ' + data.content];
	} catch (error) {
		render.content.at(-1).lines = [
			...render.content.at(-1).lines,
			'ChatGPT: – ' + 'Sorry, I can`t give you an answer. Try another question please',
		];
	}
	return;
};

const firstLetterUppercase = string => string[0].toUpperCase() + string.slice(1);

export default renderAnswer;
