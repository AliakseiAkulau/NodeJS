import { UserGroupAttributes, UserGroupCreationAttributes } from '../types';
import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/database';
import Joi from 'joi';

export const userGroupSchema = Joi.object().keys({
    groupId: Joi.string().required(),
    userIds: Joi.array().items(Joi.string()).required()
});

const UserGroup: ModelDefined<UserGroupAttributes, UserGroupCreationAttributes> = sequelize.define(
    'user_groups',
    {
        id: {
            type: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: DataTypes.UUIDV4,
        group_id: DataTypes.UUIDV4
    },
    {
        createdAt: false,
        updatedAt: false
    }
);

export default UserGroup;
