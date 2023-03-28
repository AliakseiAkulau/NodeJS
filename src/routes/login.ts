import express, { Request, Response } from 'express';
import { login } from '../services/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { HTTP_CODE } from '../constants';

const loginRouter = express.Router();

loginRouter.post('/login', async (req: Request, res: Response) => {
    const { login: name, password } = req.body;
    const user = await login(name);

    try {
        if (await bcrypt.compare(password, user?.dataValues.password || '')) {
            const accessToken = jwt.sign({ name }, process.env.SECRET || '', { expiresIn: '1d' });
            await res.send(accessToken);
        } else {
            await res.status(HTTP_CODE.BAD_REQUEST).send('Invalid Credentials');
        }
    } catch ({ message }) {
        console.log('catch');
        res.status(HTTP_CODE.BAD_REQUEST).send(message);
    }
});

export default loginRouter;
