import { Model } from 'sequelize';
import Group from '../models/group';
import { GroupAttributes, GroupCreationAttributes } from '../types';

export const addToGroupDb = async (
    newGroup: GroupAttributes
): Promise<Model<GroupAttributes, GroupCreationAttributes>> => await Group.create(newGroup);

export const getGroupsDb = async (): Promise<Model<GroupAttributes, GroupCreationAttributes>[]> =>
    await Group.findAll({});

export const getGroupByIdDb = async (id: string): Promise<Model<GroupAttributes, GroupCreationAttributes> | unknown> =>
    await Group.findOne({
        where: { id }
    });

export const updateGroupDb = async (
    id: string,
    updatedGroup: GroupAttributes
): Promise<Model<GroupAttributes, GroupCreationAttributes> | unknown> =>
    await Group.update(updatedGroup, {
        where: { id }
    });

export const deleteGroupDb = async (id: string): Promise<Model<GroupAttributes, GroupCreationAttributes> | unknown> =>
    await Group.destroy({
        where: { id }
    });
