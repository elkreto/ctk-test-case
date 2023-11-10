const Sequelize = require('sequelize')
const sequelize = require('../cfg/sequelize')

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id
 *         - text
 *       properties:
 *         id:
 *           type: string
 *           format: uuid-v4
 *           description: The auto-generated id of the comment
 *         text:
 *           type: string
 *           description: Contenet of the comment   
 *         updatedAt: 
 *           type: string
 *           format: date
 *           description: Last edit date
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Creation date   
 */
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