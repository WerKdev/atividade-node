const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('produtos_db', 'root', '', {
    host: 'localhost',
    port: 3309,
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;