const {Post, Comment} = require('../models')

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: Post managing API
 */

/**
 * @swagger
 * /api/post/all:
 *  get:
 *      summary: Returns post
 *      tags: [Post]
 *      parameters:
 *            - in: query
 *              name: page
 *              description: page to get 
 *              default: 0
 *              schema:
 *                  type: integer
 *            - in: query
 *              name: pageSize
 *              description: max num of returned objects
 *              default: 5
 *              schema:
 *                  type: integer
 *      responses:
 *           200:
 *                description: array of post objects
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Post'
 *                        example:
 *                          - id: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                            title: Holiday Break
 *                            text: No lessons during 22.12.2023 - 2.1.2024
 *                            comments: []
 *                            updatedAt: 2023-10-04T18:55:43+0000
 *                            createdAt: 2023-10-04T18:55:43+0000
 */
exports.getAllPosts = (req, res, next) => {
    const page = req.query.page || 0
    const pageSize = req.query.pageSize || 5

    Post.findAll({
        offset: page * pageSize,
        limit: pageSize,
        include: Comment
    })
    .then((posts) => res.json(posts))
    .catch((err) => next(err))
}

/**
 * @swagger
 * /api/post:
 *  get:
 *      summary: Returns given post
 *      tags: [Post]
 *      parameters:
 *         - in: query
 *           name: id
 *           description: id of the post to get
 *           schema:
 *              type: string
 *              format: uuid-v4
 *           required: 
 *              - id
 *      responses:
 *           200:
 *                description: meeting object
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Post'
 *                        example:
 *                          id: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                          title: Holiday Break
 *                          text: No lessons during 22.12.2023 - 2.1.2024
 *                          comments: []
 *                          updatedAt: 2023-10-04T18:55:43+0000
 *                          createdAt: 2023-10-04T18:55:43+0000
 *           400:
 *              content:
 *                  text/plain:
 *                      example: No id was provided
 *           404:
 *              description: No post found
 */
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

/**
 * @swagger
 * /api/post:
 *  put:
 *      summary: Creates post
 *      tags: [Post]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title: 
 *                              type: string
 *                              description: title of the post
 *                              example: Holiday Break
 *                          text:
 *                              type: string
 *                              description: content of the post
 *                              example: Holidays coming!!
 *                      required: 
 *                          - name
 *      responses:
 *           200:
 *                description: post object
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Post'
 *                        example:
 *                          id: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                          title: Holiday Break
 *                          text: No lessons during 22.12.2023 - 2.1.2024
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
exports.addPost = (req, res, next) => {
    const {title, text} = req.body

    Post.create({
        title: title,
        text: text
    })
    .then((post) => res.json(post))
    .catch((err) => next(err))
}

/**
 * @swagger
 * /api/post:
 *  post:
 *      summary: Edit post
 *      tags: [Post]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: string
 *                              format: uuid-v4
 *                              description: id of the post to edit
 *                              example: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                          title:
 *                              type: string
 *                              description: new title of the post
 *                              example: NewName
 *                          text:
 *                              type: string
 *                              description: new text of the post
 *                              example: NewContent
 *      responses:
 *           200:
 *                description: post object
 *                content:
 *                    application/json:
 *                        schema:
 *                          $ref: '#/components/schemas/Post'
 *                        example:
 *                          id: 52e15172-17f7-47b0-b4c0-bdff49ce224d
 *                          title: NewName
 *                          text: NewContent 
 *                          updatedAt: 2023-10-04T18:55:43+0000
 *                          createdAt: 2023-10-04T18:55:43+0000
 *           400:
 *              content:
 *                  text/plain:
 *                      example: No id was provided
 *           404:
 *              description: No post found
 */
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

/**
 * @swagger
 * /api/post:
 *  delete:
 *      summary: Delete post
 *      tags: [Post]
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
 *              description: No post found with given id
 */
exports.deletePost = async (req, res, next) => {
    const {id} = req.body

    if(!id) return res.status(400).send('No id given!')

    const post = await Post.findOne({where: {id: id}})

    if(!post) return res.status(404).send('No post found with given id!')

    post.destroy()
    .then(() => res.sendStatus(200))
    .catch((err) => next(err))
}