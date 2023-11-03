const Sequelize = require('sequelize')
const env = require('dotenv').config()

module.exports = new Sequelize({
    dialect: 'sqlite',
    host: './db.sqlite',
    logging: false
})