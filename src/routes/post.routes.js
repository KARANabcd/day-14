const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload multer({stroge: multer.memoryStorage()})


postRouter.post("/",postController.createPostController)

module.exports = postRouter 