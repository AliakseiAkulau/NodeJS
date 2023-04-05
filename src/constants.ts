export const PORT = process.env.PORT || 3000;

export enum HTTP_CODE {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    NOT_AUTHORIZED = 401,
    FORBIDDEN = 403
}

export const usersMock = [
    {
        // id: '7736ac13-a833-4990-9dd6-a81e37eaeb5e',
        login: 'user1',
        password: 'Password1',
        age: 21
    },
    {
        // id: 'ebe13fa2-d604-48bd-8879-e40e10809eb1',
        login: 'user2',
        password: 'password2',
        age: 22
    },
    {
        // id: '8a6a3c0e-a5f1-4be5-a82d-b0402261d683',
        login: 'user3',
        password: 'password3',
        age: 23
    }
];

export const groupMock = [
    {
        // id: 'd466ea14-6d37-4215-9f26-cd6ac6127cdf',
        name: 'read_only',
        permissions: ['READ']
    },
    {
        id: '57ecb04d-3179-4f88-9140-44f5cd639a39',
        name: 'full_access',
        permissions: ['READ', 'WRITE']
    }
];

export const NOT_FOUND_ERROR = 'User was not found';
