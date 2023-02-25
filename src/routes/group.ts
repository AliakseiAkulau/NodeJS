import express, { Request, Response } from 'express';
import { groupSchema } from '../models/group';
import { addGroup, deleteGroup, getGroup, getGroups, updateGroup } from '../services/group';
import { validateSchema } from '../utils/validateSchema';
import { HttpCode, NOT_FOUND_ERROR } from '../constants';

const groupRouter = express.Router();

groupRouter.get('/groups', async (req: Request, res: Response) => {
    const groups = await getGroups();

    res.json(groups);
});

groupRouter.get('/groups/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const group = await getGroup(id);

    res.json(group);
});

groupRouter.post('/groups/add', validateSchema(groupSchema), async (req: Request, res: Response) => {
    try {
        const newGroups = await addGroup(req.body);
        res.json(newGroups);
    } catch (err) {
        res.status(HttpCode.BadRequest).send((err as Error).message);
    }
});

groupRouter.put('/groups/:id', validateSchema(groupSchema), async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedGroup = await updateGroup(id, req.body);

    if (updatedGroup) {
        res.json(updatedGroup);
    } else {
        res.status(HttpCode.NotFound).send(NOT_FOUND_ERROR);
    }
});

groupRouter.delete('/groups/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedGroups = await deleteGroup(id);

    res.json(updatedGroups);
});

export default groupRouter;
