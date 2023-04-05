import request from 'supertest';
import express from 'express';
import groupRouter from '../routes/group';
import { groupMock } from '../constants';

describe('Group API', () => {
    const app = express();

    app.use(express.json());
    app.use('/api', groupRouter);

    test('GET /api/groups should return an array of groups', async () => {
        const response = await request(app).get('/api/groups');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('POST /api/groups/add should create a new group', async () => {
        const group = await request(app).post('/api/groups/add').send(groupMock[0]);

        expect(group.status).toBe(200);
        expect(group.body).toHaveProperty('name', groupMock[0].name);
    });

    test('GET /api/groups/:id should return a group', async () => {
        const group = await request(app).post('/api/groups/add').send(groupMock[0]);
        const id = group.body.id;

        const response = await request(app).get(`/api/groups/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ ...groupMock[0], id });
    });

    test('PUT /api/groups/:id should update a group', async () => {
        const group = await request(app).post('/api/groups/add').send(groupMock[0]);
        const id = group.body.id;

        const updatedGroup = { ...groupMock[0], name: 'newName' };
        const response = await request(app)
            .put(`/api/groups/${id}`)
            .send(updatedGroup)
            .set('Accept', 'application/json');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name', 'newName');
    });

    test('DELETE /api/groups/:id should delete a group', async () => {
        const group = await request(app).post('/api/groups/add').send(groupMock[0]);
        const id = group.body.id;

        const response = await request(app).delete(`/api/groups/${id}`);
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.find((item: { id: string }) => item.id === id)).toBe(undefined);
    });
});
