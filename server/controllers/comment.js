const {Post, Comment} = require('../models')

exports.addComment = async (req, res, next) => {
    const {text, postId} = req.body

    if(!postId) return res.status(400).send('No postId given!')

    const post = await Post.findOne({where: {id: postId}})

    if(!post) return res.status(400).send('No post with given postId!')

    Comment.create({
        postId: postId,
        text: text
    })
    .then((comment) => res.json(comment))
    .catch((err) => next(err))
}

exports.editComment = async (req, res, next) => {
    const {id, text} = req.body

    if(!id) return res.status(400).send('No id given!')

    const comment = await Comment.findOne({where: {id: id}})

    if(!comment) return res.status(404).send('No comment with given id was found!')

    comment.text = text

    comment.save()
    .then((updatedComment) => res.json(updatedComment))
    .err((err) => next(err))
}

exports.deleteComment = (req, res, next) => {
    const {id} = req.body

    if(!id) return res.status(400).send('No id given!')

    const comment = Comment.findOne({where: {id: id}})

    if(!comment) return res.status(404).send('No comment with given id was found!')

    comment.destroy()
    .then(() => res.sendStatus(200))
    .catch((err) => next(err))
}