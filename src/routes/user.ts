import express, { Request, Response } from 'express';
import { createUser, deleteUser, getAutoSuggestUsers, getUser, getUsers, updateUser } from '../models/user';
import { validateSchema } from '../utils/validateSchema';
import { userSchema } from '../utils/userSchema';
import { HttpCode, NOT_FOUND_ERROR } from '../constants';

const router = express.Router();

router.get('/users', (req: Request, res: Response) => {
    const { login, limit } = req.query;

    if (limit && login) {
        res.json(getAutoSuggestUsers(login as string, limit as string));
    }

    const users = getUsers();

    res.json(users);
});

router.get('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const user = getUser(id);

    if (user) {
        res.json(user);
    } else {
        res.status(HttpCode.NotFound).send(NOT_FOUND_ERROR);
    }
});

router.post('/users/add', validateSchema(userSchema), (req: Request, res: Response) => {
    try {
        const newUser = createUser(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(HttpCode.BadRequest).send((err as Error).message);
    }
});

router.put('/users/:id', validateSchema(userSchema), (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = updateUser(id, req.body);

    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(HttpCode.NotFound).send(NOT_FOUND_ERROR);
    }
});

router.delete('/users/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = deleteUser(id);

    if (deletedUser) {
        res.json(deletedUser);
    } else {
        res.status(HttpCode.NotFound).send(NOT_FOUND_ERROR);
    }
});

export default router;
