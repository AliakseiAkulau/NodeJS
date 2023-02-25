import { Model } from 'sequelize/types';
import { getGroupsDb, getGroupByIdDb, addToGroupDb, updateGroupDb, deleteGroupDb } from '../data-access/group';
import { GroupAttributes, GroupCreationAttributes } from '../types';

export const getGroups = async (): Promise<Model[] | unknown[]> => (await getGroupsDb()) || [];

export const getGroup = async (id: string): Promise<GroupAttributes | unknown> => (await getGroupByIdDb(id)) || {};

export const addGroup = async (newGroup: GroupAttributes): Promise<Model<GroupAttributes, GroupCreationAttributes>> =>
    await addToGroupDb(newGroup);

export const updateGroup = async (id: string, updatedGroup: GroupAttributes): Promise<GroupAttributes | unknown> => {
    await updateGroupDb(id, updatedGroup);
    return await getGroup(id);
};

export const deleteGroup = async (id: string): Promise<Model[] | unknown[]> => {
    await deleteGroupDb(id);
    return (await getGroupsDb()) || [];
};
