import axios from 'axios';

const renderAnswer = async (render, command) => {
	try {
		render.content.at(-1).lines = [...render.content.at(-1).lines, '- ' + firstLetterUppercase(command), '- ...'];
		const { data } = await axios.post(import.meta.env.VITE_CHATGPT_API, { question: command });
		render.content.at(-1).lines = [...render.content.at(-1).lines, '- ' + data.content];
	} catch (error) {
		render.content = [...render.content, { title: 'Can`t get response: ' + error }];
	}
	return;
};

const firstLetterUppercase = string => string[0].toUpperCase() + string.slice(1);

export default renderAnswer;
