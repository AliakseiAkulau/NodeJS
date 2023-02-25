import { Model } from 'sequelize/types';
import { UserGroupAttributes, UserGroupCreationAttributes } from '../types';
import UserGroup from '../models/userGroup';

export const getUserGroupDb = async (): Promise<Model<UserGroupAttributes, UserGroupCreationAttributes>[]> =>
    await UserGroup.findAll({});

export const addUsersToGroupDb = async (
    groupId: string,
    usersIds: string[]
): Promise<Model<UserGroupAttributes, UserGroupCreationAttributes>[] | unknown> =>
    await UserGroup.bulkCreate(
        usersIds.map((userId) => ({
            user_id: userId,
            group_id: groupId
        }))
    );
