const {Post, Comment} = require('../models')

exports.getAllPosts = (req, res, next) => {
    const page = req.query.page | 0
    const pageSize = req.query.pageSize | 5

    Post.findAll({
        offset: page * pageSize,
        limit: pageSize
    })
    .then((posts) => res.json(posts))
    .catch((err) => next(err))
}

exports.getPost = async (req, res, next) => {
    const {id} = req.query

    if(!id) return res.status(400).send('No id given!')

    const post = await Post.findOne({
        where: {id: id},
        include: Comment
    })

    if(!post) return res.status(404).send('No post found with given id!')

    return res.json(post)
}

exports.addPost = (req, res, next) => {
    const {title, text} = req.body

    Post.create({
        title: title,
        text: text
    })
    .then((post) => res.json(post))
    .catch((err) => next(err))
}

exports.editPost = async (req, res, next) => {
    const {id, title, text} = req.body

    if(!id) return res.status(400).send('No id given!')

    const post = await Post.findOne({where: {id: id}})

    if(!post) return res.status(404).send('No post found with given id!')

    if(title) post.title = title
    if(text) post.text = text

    post.save()
    .then((post) => res.json(post))
    .catch((err) => next(err))
}

exports.deletePost = async (req, res, next) => {
    const {id} = req.body

    if(!id) return res.status(400).send('No id given!')

    const post = await Post.findOne({where: {id: id}})

    if(!post) return res.status(404).send('No post found with given id!')

    post.destroy()
    .then(() => res.sendStatus(200))
    .catch((err) => next(err))
}