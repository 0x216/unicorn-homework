const { Sequelize } = require('sequelize');
require('dotenv').config();


let sequelize;
if (process.env.NODE_ENV !== 'test') {

    sequelize = new Sequelize(
        process.env.POSTGRES_DB,
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            dialect: 'postgres',
        }
    );
}
else {
    sequelize = new Sequelize('test_database', 'test_user', 'test_password', {
        host: 'localhost',
        dialect: 'postgres',
        port: 5435, 
    });
    
}
module.exports = sequelize;
