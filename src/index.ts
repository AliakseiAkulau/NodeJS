import * as dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response, Errback } from 'express';
import userRouter from './routes/user';
import groupRouter from './routes/group';
import userGroup from './routes/userGroup';
import { PORT } from './constants';
import { sequelize } from './config/database';

const app = express();

app.set('strict routing', true);
app.use(express.json());
app.use(userRouter);
app.use(groupRouter);
app.use(userGroup);

app.use((err: Errback, req: Request, res: Response) => {
    console.log(err);
    res.status(500).send('Some error');
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('successful db connection');
    } catch (e) {
        console.error('error db', e);
    }
    console.log(`Server is listening on port ${PORT}`);
});
