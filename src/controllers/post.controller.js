const postModel = require("../models/post/.model")
const ImageKit = require("@imagekit/nodejs")
const {buffer} = require("buffer")



const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req, res){
  console.log(req.body , req.file)
  const file = await imageKit.files.upload({
    file:new toFile(Buffer.from(req.file.buffer), 'file'),
    fileName:"test"
  })
  res.send(file)
}

module.exports = {
createPostController
}