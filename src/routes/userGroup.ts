import express, { Request, Response } from 'express';
import { validateSchema } from '../utils/validateSchema';
import { userGroupSchema } from '../models/userGroup';
import { addUsersToGroup, getUserGroup } from '../services/userGroup';
import { HTTP_CODE, NOT_FOUND_ERROR } from '../constants';

const userGroupRouter = express.Router();

userGroupRouter.get('/user_group', async (req: Request, res: Response) => {
    try {
        const userGroup = await getUserGroup();
        res.json(userGroup);
    } catch (err) {
        res.status(HTTP_CODE.NOT_FOUND).send(NOT_FOUND_ERROR);
    }
});

userGroupRouter.post('/user_group/add', validateSchema(userGroupSchema), async (req: Request, res: Response) => {
    const { groupId, userIds } = req.body;
    try {
        const userGroup = await addUsersToGroup(groupId, userIds);
        res.json(userGroup);
    } catch (err) {
        res.status(HTTP_CODE.BAD_REQUEST).send((err as Error).message);
    }
});

export default userGroupRouter;
