const postModel = require("../models/post/.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const { post } = require("../routes/post.routes")



const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})
 
async function createPostController(req, res) {
  // console.log(req.body, req.file)

  // const token = req.cookies("token")
  // if (!token) {
  //   return res.status(401).json({
  //     message: "Token provided, unauthorized access"
  //   })
  // }


  // let decoded = null
  // try{
  //  decoded = jwt.verify(token, process.env.JWT_SECRET) 
  // } catch (err){
  //   return res.status(401).json({
  //     message:"user not authorized"
  //   })
  // }
  // console.log(decoded)
  
 const userId = req.user.id
  const file = await imageKit.files.upload({
    file: new toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: "test",
    folder: "cohort-2-insta-clone-posts"
  })

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id
  })
  res.status(201).json({
    message: "post created successfully",
    post
  })
  // res.send(file)
}

async function getPostController(res, req){
  // const token = req.cookies.token
  // try{ 
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET)

  //   let decoded;
  // }catch (err){
  //   return res.status(401).json({
  //     message:"Token Invalid"
  // })
  // }
  // const userId = decoded.id
  const userId = req.user.id
  const posts = await postModel.find({
    user:userId
  })
  res.status(200).json({
    mesage:"Posts fetched successfully",
    posts
  })
 
}

async function getPostDetails(req, res){
//   const token = req.cookies.token

//   if(!token){
//     return res.status(401).json({
//       message:"UnAuthorized Access"
//     })
//   }
// let decoded
//   try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET)
//   }catch (err){
//     return res.status(301).json({
//       message:"Invalid TOken"
//     })
//   }
  const useId = req.user.id
  const postId = req.paramss.postId

const pst = await postModel.findById(postID)
if(!post){
  return res.status(304).jsosn({
    message:"post not found."
  })
}
const isValidUser = post.user === userId

if(!isValidUser){
  return res.status(403).json({
    messager:"Forbidden contents"
  })
}
 return res.status(200).json({
  message:"post fetched susccessfully",
  post
 })
}

module.exports = {
  createPostController,
  getPostController
}