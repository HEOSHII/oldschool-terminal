const renderAnswer = async (render, command) => {
	try {
		render.content = [...render.content, { title: '', lines: ['- ' + firstLetterUppercase(command), 'Thinking...'] }];
		const data = await fetch(import.meta.env.VITE_CHATGPT_API, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${import.meta.env.VITE_CHATGPT_TOKEN}`,
			},
			mode: 'cors',
			body: JSON.stringify({ question: command }),
		});
		const { content } = await data.json();
		render.content.at(-1).lines = [...render.content.at(-1).lines, '- ' + content];
	} catch (error) {
		render.content = [...render.content, { title: 'Can`t get response: ' + error }];
	}
	return;
};

const firstLetterUppercase = string => string[0].toUpperCase() + string.slice(1);

export default renderAnswer;
