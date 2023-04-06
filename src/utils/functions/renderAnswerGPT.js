import axios from 'axios';

const renderAnswerGPT = async (question, display) => {
	display.busy = true;
	try {
		display.content.at(-1).lines = [...display.content.at(-1).lines, 'You: – ' + firstLetterUppercase(question)];
		const { data } = await axios.post(import.meta.env.VITE_CHATGPT_API, { question });
		display.content.at(-1).lines = [...display.content.at(-1).lines, 'OpenAI: – ' + data.content];
		display.busy = false;
	} catch (error) {
		display.content.at(-1).lines = [
			...display.content.at(-1).lines,
			'OpenAI: – Sorry, I can`t give you an answer. Try another question please',
		];
		console.warn(error);
		display.busy = false;
	}
};

const firstLetterUppercase = string => string[0].toUpperCase() + string.slice(1);

export default renderAnswerGPT;
