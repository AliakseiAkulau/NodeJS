import { Sequelize } from 'sequelize';
import config from './';

console.log(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, config.DB_HOST);

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASSWORD, {
    host: config.DB_HOST,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export { Sequelize, sequelize };
