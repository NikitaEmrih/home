const express = require('express')
const PostsController = require('./post.controller')

const PostRouter = express.Router()

PostRouter.get("/posts/", PostsController.getAll)
PostRouter.get("/posts/:id", PostsController.getById)
PostRouter.post("/posts", PostsController.create)

module.exports = PostRouter