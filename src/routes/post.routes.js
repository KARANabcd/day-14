const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");

// Corrected the assignment operator and the "storage" typo
const upload = multer({ storage: multer.memoryStorage() });

// Routes
postRouter.post("/", postController.createPostController); 
postRouter.get("/", postController.getPostController);
postRouter.get("/details/:postId", postController.getPostDetails);

module.exports = postRouter;