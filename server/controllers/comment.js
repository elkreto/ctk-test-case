const {Post, Comment} = require('../models')

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: Comment managing API
 */

/**
 * @swagger
 * /api/comment:
 *  put:
 *      summary: Creates comment in post
 *      tags: [Comment]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          text:
 *                              type: string
 *                              description: content of the comment
 *                              example: +1
 *                          postId:
 *                              type: string
 *                              format: uuid-v4
 *                              example: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                      required: 
 *                          - text
 *                          - postId
 *      responses:
 *           200:
 *                description: comment object
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Comment'
 *                        example:
 *                          id: 12e345172-27f5-47d0-a4h0-bdff49ce224d
 *                          text: +1
 *                          updatedAt: 2023-10-04T18:55:43+0000
 *                          createdAt: 2023-10-04T18:55:43+0000
 *           400:
 *              content:
 *                  application/json:
 *                      example:
 *                          name: Validation Error
 *                          field: text
 *                          message: text is too long
 */
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

/**
 * @swagger
 * /api/comment:
 *  post:
 *      summary: Edits comment in post
 *      tags: [Comment]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          text:
 *                              type: string
 *                              description: content of the comment
 *                              example: newText
 *                          id:
 *                              type: string
 *                              format: uuid-v4
 *                              example: 12e345172-27f5-47d0-a4h0-bdff49ce224d
 *                      required: 
 *                          - text
 *                          - postId
 *      responses:
 *           200:
 *                description: comment object
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Comment'
 *                        example:
 *                          id: 12e345172-27f5-47d0-a4h0-bdff49ce224d
 *                          text: newText
 *                          updatedAt: 2023-10-05T18:55:43+0000
 *                          createdAt: 2023-10-04T18:55:43+0000
 *           400:
 *              content:
 *                  application/json:
 *                      example:
 *                          name: Validation Error
 *                          field: text
 *                          message: text is too long
 *           404: 
 *              content: 
 *                  plain/text: No comment with given id was found
 */
exports.editComment = async (req, res, next) => {
    const {id, text} = req.body

    if(!id) return res.status(400).send('No id given!')

    const comment = await Comment.findOne({where: {id: id}})

    if(!comment) return res.status(404).send('No comment with given id was found!')

    comment.text = text

    comment.save()
    .then((updatedComment) => res.json(updatedComment))
    .catch((err) => next(err))
}

/**
 * @swagger
 * /api/comment:
 *  delete:
 *      summary: Delete comment
 *      tags: [Comment]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              format: uuid-v4
 *                              example: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                      required:
 *                          - id
 *      responses:
 *           200:
 *              description: OK
 *           400: 
 *              description: No id provided   
 *           404:
 *              description: No comment found with given id
 */
exports.deleteComment = async (req, res, next) => {
    const {id} = req.body

    if(!id) return res.status(400).send('No id given!')

    const comment = await Comment.findOne({where: {id: id}})

    if(!comment) return res.status(404).send('No comment with given id was found!')

    comment.destroy()
    .then(() => res.sendStatus(200))
    .catch((err) => next(err))
}