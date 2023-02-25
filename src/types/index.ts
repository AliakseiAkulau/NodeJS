import { Optional } from 'sequelize';

export type User = {
    id?: string;
    login: string;
    password: string;
    age: number;
    is_deleted?: boolean;
};

export type UserCreationAttributes = Optional<User, 'id' | 'is_deleted'>;

export type DataBase = {
    users: User[];
};

export const permissions = ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES'];
export type Permission = typeof permissions;

export interface GroupAttributes {
    id?: string;
    name: string;
    permissions: Array<Permission>;
}

export interface UserGroupAttributes {
    id?: string;
    user_id: string;
    group_id: string;
}

export type UserGroupCreationAttributes = Optional<UserGroupAttributes, 'id'>;

export type GroupCreationAttributes = Optional<GroupAttributes, 'id'>;
