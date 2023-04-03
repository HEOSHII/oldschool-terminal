import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAIApi, Configuration } from 'openai';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.options('*', cors());

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/api', async (req, res) => {
	const content = await req.body.question;
	const { data } = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [{ role: 'user', content }],
	});
	res.json(data.choices[0].message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});