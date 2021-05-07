const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DisLikeSchema = mongoose.Schema({
   productId:{
       type:Schema.Types.ObjectId,
       ref:'Product'
   },
   commentId:{
    type:Schema.Types.ObjectId,
    ref:'Comment'
   },
   userTo:{
       type:Schema.Types.ObjectId,
       ref:'User'
   }

},{timestamps:true})



const DisLike = mongoose.model('DisLike', DisLikeSchema);

module.exports = { DisLike }