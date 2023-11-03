const Sequelize = require('sequelize')
const sequelize = require('../cfg/sequelize')

const Post = sequelize.define('post', {
    id: {
        type: Sequelize.UUIDV4,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notNull: true,
            len: [1, 50]
        }
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

module.exports = Post