import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from './routes/user';
import groupRouter from './routes/group';
import userGroup from './routes/userGroup';
import { PORT } from './constants';
import { sequelize } from './config/database';
import { errorHandler, logger, morganMiddleware } from './logger';
import authorization from './middleware/authorization';
import loginRouter from './routes/login';
import cors from 'cors';

const app = express();

app.set('strict routing', true);

process
    .on('unhandledRejection', (reason, promise) => {
        logger.error(`UnhandledRejection: ${promise}, reason: ${reason}`);
    })
    .on('uncaughtException', (err) => {
        logger.error(`uncaughtException: ${err}`);
    });
app.use(express.json());
app.use(morganMiddleware);
app.use(cors());
app.use((req, res, next) => {
    if (req.url === '/login') {
        next();
    } else {
        authorization(req, res, next);
    }
});
app.use(userRouter);
app.use(groupRouter);
app.use(userGroup);
app.use(errorHandler);
app.use(loginRouter);

const server = app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        logger.info('successful db connection');
    } catch (e) {
        logger.error('error db', e);
    }
    logger.info(`Server is listening on port ${PORT}`);
});

export default server;
