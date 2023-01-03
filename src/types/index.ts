export type User = {
    id?: string;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
};

export type DataBase = {
    users: User[];
};
