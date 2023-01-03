import express, { Request, Response, Errback } from 'express';
import userRouter from './routes/user';
import { PORT } from './constants';

const app = express();

app.set('strict routing', true);
app.use(express.json());
app.use(userRouter);

app.use((err: Errback, req: Request, res: Response) => {
    console.log(err);
    res.status(500).send('Some error');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
