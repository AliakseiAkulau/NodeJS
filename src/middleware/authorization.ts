import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../constants';
import 'dotenv/config';

export const authorization = ({ headers }: Request, res: Response, next: NextFunction) => {
    const token = headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(HTTP_CODE.NOT_AUTHORIZED).send('Not Authorized');
    }

    jwt.verify(token, process.env.SECRET || '', (error) => {
        if (error) return res.status(HTTP_CODE.FORBIDDEN).send('FORBIDDEN');

        next();
    });
};
