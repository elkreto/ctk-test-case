const Sequelize = require('sequelize')
const sequelize = require('../cfg/sequelize')

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - text
 *       properties:
 *         id:
 *           type: string
 *           format: uuid-v4
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: Name/Title of the post
 *         text:
 *           type: string
 *           description: Contenet of the post   
 *         updatedAt: 
 *           type: string
 *           format: date
 *           description: Last edit date
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Creation date   
 */
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