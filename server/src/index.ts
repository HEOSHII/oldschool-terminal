import express, { Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAIApi, Configuration } from 'openai';
dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

const configuration = new Configuration({
	organization: process.env.OPENAI_API_ORGANIZATION,
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/', (req: Request, res: Response) => {
	res.send('Terminal Root Path');
});

app.post('/chat', async (req: Request, res: Response) => {
	res.header('Access-Control-Allow-Origin', '*');
	const messages = req.body.messages;
	try {
		const { data } = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo-16k',
			messages,
		});
		res.json(data.choices[0].message);
	} catch (error) {
		console.log(error);
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}`);
});
