const router = require('express').Router()
const comment = require('../controllers/comment')
const err = require('../controllers/error')

//API
router.put('/api/comment', comment.addComment, err.sequelizeHandler)
router.post('/api/comment', comment.editComment, err.sequelizeHandler)
router.delete('/api/comment', comment.deleteComment, err.sequelizeHandler)

module.exports = router
