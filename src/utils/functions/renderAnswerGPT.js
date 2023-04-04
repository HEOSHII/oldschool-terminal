import axios from 'axios';

const renderAnswerGPT = async ({ content }, command) => {
	try {
		content.at(-1).lines = [
			...content.at(-1).lines,
			'You: – ' + firstLetterUppercase(command),
			'Assistant: * ... *',
		];
		const { data } = await axios.post(import.meta.env.VITE_CHATGPT_API, { question: command });
		content.at(-1).lines = [...content.at(-1).lines, 'Assistant: – ' + data.content];
	} catch (error) {
		content.at(-1).lines = [
			...content.at(-1).lines,
			'Assistant: – ' + 'Sorry, I can`t give you an answer. Try another question please',
		];
		console.warn(error);
	}
};

const firstLetterUppercase = string => string[0].toUpperCase() + string.slice(1);

export default renderAnswerGPT;
