const { v4: uuid } = require('uuid');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface
            .createTable('users', {
                id: {
                    allowNull: false,
                    primaryKey: true,
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4
                },
                login: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true
                },
                password: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                age: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                is_deleted: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
            })
            .then(() => {
                return queryInterface.bulkInsert(
                    'users',
                    [
                        {
                            id: uuid(),
                            login: 'user1',
                            password: 'password1',
                            age: 21
                        },
                        {
                            id: uuid(),
                            login: 'user2',
                            password: 'password2',
                            age: 22
                        },
                        {
                            id: uuid(),
                            login: 'user3',
                            password: 'password3',
                            age: 23
                        }
                    ],
                    {}
                );
            });
    },
    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable('users');
    }
};
