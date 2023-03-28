import express, { Request, Response } from 'express';
import { validateSchema } from '../utils/validateSchema';
import { userSchema } from '../models/user';
import { HTTP_CODE, NOT_FOUND_ERROR } from '../constants';
import { getUsers, getUser, addUser, updateUser, deleteUser, getAutoSuggestUsers } from '../services/user';

const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
    const { login, limit } = req.query;

    if (limit && login) {
        return res.json(await getAutoSuggestUsers(login as string, limit as string));
    }
    const users = await getUsers();

    res.json(users);
});

router.get('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await getUser(id);

    if (user) {
        res.json(user);
    } else {
        res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_ERROR);
    }
});

router.post('/users/add', validateSchema(userSchema), async (req: Request, res: Response) => {
    try {
        const newUser = await addUser(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(HTTP_CODE.BAD_REQUEST).send((err as Error).message);
    }
});

router.put('/users/:id', validateSchema(userSchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    if (updatedUser) {
        res.json(updatedUser);
    } else {
        res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_ERROR);
    }
});

router.delete('/users/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);

    res.json(deletedUser);
});

export default router;
