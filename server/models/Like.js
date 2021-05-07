const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeSchema = mongoose.Schema({
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



const Like = mongoose.model('Like', LikeSchema);

module.exports = { Like }