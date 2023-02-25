import express, { Request, Response } from 'express';
import { validateSchema } from '../utils/validateSchema';
import { userGroupSchema } from '../models/userGroup';
import { addUsersToGroup, getUserGroup } from '../services/userGroup';
import { HttpCode, NOT_FOUND_ERROR } from '../constants';

const userGroupRouter = express.Router();

userGroupRouter.get('/user_group', async (req: Request, res: Response) => {
    try {
        const userGroup = await getUserGroup();
        res.json(userGroup);
    } catch (err) {
        res.status(HttpCode.NotFound).send(NOT_FOUND_ERROR);
    }
});

userGroupRouter.post('/user_group/add', validateSchema(userGroupSchema), async (req: Request, res: Response) => {
    const { groupId, userIds } = req.body;
    try {
        const userGroup = await addUsersToGroup(groupId, userIds);
        res.json(userGroup);
    } catch (err) {
        res.status(HttpCode.BadRequest).send((err as Error).message);
    }
});

export default userGroupRouter;
