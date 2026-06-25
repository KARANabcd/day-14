const express = require('express') 
const authController = require("../controllers/auth.controller")



const authRouter = express.Router()



authRouter.post('/register' )
authRouter.post('/login' )
 


 module.exports = authRouter;