import axios from 'axios';

const renderImageByPrompt = async (prompt, display) => {
	if (!prompt) {
		display.content = [
			...display.content,
			{
				title: 'Can not generate the image by empty prompt',
				lines: ['Try to enter some prompt after command IMAGE to generate image', 'For example:'],
				commands: ['image Black cat with blue eyes'],
			},
		];
		return;
	}
	display.busy = true;
	try {
		const { data } = await axios.post(import.meta.env.VITE_IMAGE_API, { prompt });
		console.log(data);
		display.content = [...display.content, { title: 'Image by prompt: ' + prompt, image: data.url }];
	} catch (error) {
		display.content = [...display.content, { title: 'Can not generate the image by prompt: ' + prompt }];
		console.warn(error);
	} finally {
		display.busy = false;
	}
};

export default renderImageByPrompt;
