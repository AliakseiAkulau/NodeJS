import {
    getNonDeletedUsers,
    getNonDeletedUser,
    addToUsersDb,
    updateUserInDb,
    getAutoSuggestUsers as getAutoSuggestUsersInDb
} from '../data-access/user';
import { Model } from 'sequelize/types';
import { User as UserType } from '../types';

export const getUsers = async (): Promise<Model[]> => await getNonDeletedUsers();

export const getUser = async (id: string) => await getNonDeletedUser(id);

export const addUser = async (user: UserType) => {
    return await addToUsersDb(user);
};

export const updateUser = async (id: string, user: UserType) => {
    await updateUserInDb(id, user);
    return await getNonDeletedUser(id);
};

export const deleteUser = async (id: string): Promise<Model[]> => {
    const user = (await getNonDeletedUser(id)) as unknown as UserType;
    if (user) {
        await updateUserInDb(id, {
            ...user,
            is_deleted: true
        });
    }
    return (await getNonDeletedUsers()) || [];
};

export const getAutoSuggestUsers = async (loginSubString: string, limit: string): Promise<Model[]> => {
    return (await getAutoSuggestUsersInDb(loginSubString, parseInt(limit, 10))) || [];
};
