const {ValidationError, DatabaseError, ConnectionError} = require('sequelize')
const env = require('dotenv').config()

exports.sequelizeHandler = (err, req, res, next) => {
    const {errors} = err

    if(process.env.DEV) console.error(err)

    if(err instanceof ValidationError) return res.status(400).json({
        name: 'Validation Error',
        message: errors?.[0]?.message,
        field: errors?.[0]?.path
    })

    if(err instanceof DatabaseError) return res.status(400).json({
        name: 'Database Error',
        message: errors?.[0]?.message,
        field: errors?.[0]?.path
    })

    if(err instanceof ConnectionError) return res.status(500).json({
        name: 'Database Connection Error',
        message: errors?.[0]?.message,
        field: errors?.[0]?.path
    })
 
    return res.sendStatus(500)
}