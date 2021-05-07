const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
   writer:{
       type:Schema.Types.ObjectId,
       ref:'User'
   },
   productId:{
    type:String
   },
   content:{
       type:String
   },
   responseTo:{
       type:String
   },
   likeUser:{
       type:Array
   },
   disLikeUser:{
       type:Array
   }

},{timestamps:true})



const Comment = mongoose.model('Comment', CommentSchema);

module.exports = { Comment }