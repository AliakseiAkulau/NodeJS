export const PORT = process.env.PORT || 3000;

export enum HTTP_CODE {
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    NOT_AUTHORIZED = 401,
    FORBIDDEN = 403
}

export const NOT_FOUND_ERROR = 'User was not found';
