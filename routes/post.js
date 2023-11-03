const router = require('express').Router()
const post = require('../controllers/post')
const err = require('../controllers/error')

//API
router.get('/api/post/all', post.getAllPosts, err.sequelizeHandler)
router.get('/api/post', post.getPost, err.sequelizeHandler)
router.put('/api/post', post.addPost, err.sequelizeHandler)
router.post('/api/post', post.editPost, err.sequelizeHandler)
router.delete('/api/post', post.deletePost, err.sequelizeHandler)

module.exports = router