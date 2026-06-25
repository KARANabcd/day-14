const userModel = require('../models/user.model')
const crypto = require('crypto')
const jwt = require("jsonwebtoken")


// authRouter.post('/register' ,
   async function registerController(req , res) {
  const{email, username, password, bio , profileImage} = req.body



 const isUserAlreadyExists = await userModel.findOne({
   $or:[
    { username},
    {email}
   ]
 })
 if (isUserAlreadyExits){
  return res.status(409)
  .json({
    message:"user already exists" + (isUserAlreadyExists.email ==
    email ? "Email already exists": "Username already exists")
  })
 }
 const hash = crytpo.createHash('sha256').update(password).digest('hex')
 const user = await userModel.create({
  username,
  email,
  bio,
  profileImage,
  password: hash
 })

 const token = jwt.sign({
  id:user._id

 } ,process.env.JWT_SECRET, 
 {expiresIn: "id"}
)

res.cookie("token" ,token )

res.satus(201).json({
  message:"user registered successfully"
,
user:{
  email:user.email,
  username:user.username,
  bio:user.bio,
  profileImage: user.profileImage
},
})
 }
// authRouter.post('/login' ,
  async function loginController(req , res){
  const{email, username, password} = req.body


 
 const user = await userModel.findOne({
  $or:[
    {
      username:username
    },
    { 
      email:email
    }
  ]
  
 })
 if(!user){
  return res.status(404).json({
    message:"user not found"
  })
 }
 const hash = crytpo.createHash('sha256').update(password).digest('hex')
 const isPasswordValid = hash == user.password;

 if(!isPasswordValid){
  return res.status(401).json({
    message:"password invalid"
  })
 }

 const token = jwt.sign(
  {id:user._id},
  process.env.JWT_SECRET,
  {exporesIn:"1d"}
 )

 res.cookie("token", token)
 res.status(200).json({
  message:"User loggIN successfully.",
  user:{
    username:user.username,
    email:user.email,
    bio:user.bio,
    profileImage:user.profileImage
  }
 })
 }

 module.exports ={
  registerController,
  loginController
 }