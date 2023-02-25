import { Model } from 'sequelize/types';
import { addUsersToGroupDb, getUserGroupDb } from '../data-access/userGroup';
import { sequelize } from '../config/database';

export const getUserGroup = async (): Promise<Model[] | unknown[]> => {
    return await getUserGroupDb();
};

export const addUsersToGroup = async (groupId: string, userIds: string[]): Promise<Model[] | unknown[]> => {
    return await sequelize.transaction(async () => {
        await addUsersToGroupDb(groupId, userIds);
        return await getUserGroupDb();
    });
};
