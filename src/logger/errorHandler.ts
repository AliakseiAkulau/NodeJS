import { Request, Response, NextFunction } from 'express';
import logger from './logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!err) {
        return next();
    }

    logger.error(err.message);
    res.sendStatus(500);
};

export default errorHandler;
