export const PORT = process.env.PORT || 3000;

export enum HttpCode {
    BadRequest = 400,
    NotFound = 404
}

export const NOT_FOUND_ERROR = 'User was not found';
