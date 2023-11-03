const Sequelize = require('sequelize')
const sequelize = require('../cfg/sequelize')

const Comment = sequelize.define('comment', {
    id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            len: [1, 250]
        }
    }
})

module.exports = Comment