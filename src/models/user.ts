import { User } from '../types';
import { DB } from '../db';
import { v4 as uuidv4 } from 'uuid';

export const getUsers = (): User[] => DB.users.filter((user: User) => !user.isDeleted);

export const getUser = (id: string): User | undefined => DB.users.find((user) => user.id === id && !user.isDeleted);

export const createUser = (user: User): User => {
    const newUser = {
        ...user,
        isDeleted: false,
        id: uuidv4()
    };
    DB.users.push(newUser);

    return newUser;
};

export const updateUser = (id: string, user: User): User | undefined => {
    const currentUserIndex = DB.users.findIndex((item) => item.id === id);

    if (currentUserIndex === -1 || DB.users[currentUserIndex].isDeleted) {
        return;
    }

    DB.users[currentUserIndex] = { ...DB.users[currentUserIndex], ...user };

    return DB.users[currentUserIndex];
};

export const deleteUser = (id: string) => {
    const currentUserIndex = DB.users.findIndex((item) => item.id === id);

    if (currentUserIndex === -1) return;

    DB.users[currentUserIndex].isDeleted = true;

    return DB.users[currentUserIndex];
};

export const getAutoSuggestUsers = (logSubString: string, limit: string): User[] => {
    const suggestedUsers: User[] = DB.users.filter(
        (user) => !user.isDeleted && user.login?.toLowerCase().includes(logSubString.toLowerCase())
    );

    suggestedUsers.sort((a: User, b: User): number => {
        if (a.login > b.login) {
            return 1;
        } else if (a.login < b.login) {
            return -1;
        }
        return 0;
    });
    return suggestedUsers.slice(0, +limit);
};
