var mongoose = require("mongoose")
var Schema = mongoose.Schema


var commentSchema = new Schema ({
discussionId:String, //Will take the produitId. 
date:Date,
auteur:String,
author:String,
body:String,
profilePic:String
})

module.exports = mongoose.model("comment",commentSchema)

