import 'dotenv/config';

export default {
    DB_HOST: process.env.DB_HOST as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_DIALECT: process.env.DB_DIALECT as string,
    PORT: process.env.PORT,
    APP_URL: process.env.APP_URL
};
