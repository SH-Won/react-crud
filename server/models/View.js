const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViewSchema = mongoose.Schema({
   product:{
       type:Schema.Types.ObjectId,
       ref:'Product'
   },
   userTo:{
       type:Schema.Types.ObjectId,
       ref:'User'
   }
},{timestamps:true})



const View = mongoose.model('View', ViewSchema);

module.exports = { View }