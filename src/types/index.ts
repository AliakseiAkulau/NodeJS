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
