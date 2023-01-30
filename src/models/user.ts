import { User as UserType, UserCreationAttributes } from '../types';
import { sequelize } from '../config/database';
import { DataTypes, ModelDefined } from 'sequelize';
import Joi from 'joi';

export const userSchema = Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])')).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    is_deleted: Joi.boolean()
});

const UserModel: ModelDefined<UserType, UserCreationAttributes> = sequelize.define(
    'users',
    {
        id: { type: DataTypes.UUIDV4, primaryKey: true, allowNull: false, defaultValue: DataTypes.UUIDV4 },
        login: { type: DataTypes.STRING, unique: true, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        age: { type: DataTypes.INTEGER, allowNull: false },
        is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { createdAt: false, updatedAt: false }
);

export default UserModel;
