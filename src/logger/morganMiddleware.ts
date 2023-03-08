import morgan from 'morgan';
import logger from './logger';

const morganMiddleware = morgan(
    (tokens, req, res) =>
        `${tokens.method(req, res)} url ${tokens.url(req, res)} status: ${tokens.status(
            req,
            res
        )} body: ${JSON.stringify((req as any).body)} - ${tokens['response-time'](req, res)} ms`,
    {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }
);

export default morganMiddleware;
