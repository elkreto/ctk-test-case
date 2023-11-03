const Post = require('./Post')
const Comment = require('./Comment')

Post.hasMany(Comment)

module.exports = {
    Post: Post,
    Comment: Comment
}