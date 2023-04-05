import Joi from 'joi';
import { DataTypes, ModelDefined } from 'sequelize';
import { sequelize } from '../config/database';
import { GroupAttributes, GroupCreationAttributes } from '../types';

export const groupSchema = Joi.object().keys({
    name: Joi.string().min(1).required(),
    permissions: Joi.array().items('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES').required()
});

const Group: ModelDefined<GroupAttributes, GroupCreationAttributes> = sequelize.define(
    'groups',
    {
        id: {
            type: DataTypes.UUIDV4,
            unique: true,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name: { type: DataTypes.STRING, unique: true },
        permissions: DataTypes.ARRAY(DataTypes.STRING)
    },
    { createdAt: false, updatedAt: false, freezeTableName: true }
);

export default Group;
