import { Model, Op } from 'sequelize';
import { User as UserType, UserCreationAttributes } from '../types';
import UserModel from '../models/user';

export const getNonDeletedUsers = async (): Promise<Model<UserType, UserCreationAttributes>[]> =>
    await UserModel.findAll({
        where: { is_deleted: false }
    });

export const getNonDeletedUser = async (id: string): Promise<Model<UserType, UserCreationAttributes> | null> =>
    await UserModel.findOne({
        where: { is_deleted: false, id }
    });

export const addToUsersDb = async (newUser: UserType): Promise<Model<UserType, UserCreationAttributes>> =>
    await UserModel.create(newUser);

export const updateUserInDb = async (id: string, updatedUser: UserType) =>
    await UserModel.update(updatedUser, {
        where: { id }
    });

export const getAutoSuggestUsers = async (
    loginSubString: string,
    limit: number
): Promise<Model<UserType, UserCreationAttributes>[]> =>
    await UserModel.findAll({
        where: {
            is_deleted: false,
            login: {
                [Op.iLike]: `%${loginSubString}%`
            }
        },
        limit,
        order: ['login']
    });

export const getUserDB = async (login: string): Promise<Model<UserType, UserCreationAttributes> | null> =>
    await UserModel.findOne({ where: { login } });
