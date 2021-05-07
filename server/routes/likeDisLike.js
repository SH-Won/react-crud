const express = require('express');
const router = express.Router();
const { Like } = require("../models/Like");
const { DisLike } = require("../models/DisLike");
const {Comment} = require('../models/Comment');




router.post('/getFavoriteProduct',(req,res)=>{
    Like.find({userTo:req.body.userTo})
    .populate('productId')
    .exec((err,likes)=>{
        if(err) return res.json({success:false,err})

       //filter를 이용해서 commentId 와 productId 중 productId만 가져옴
        let result = likes.filter(like=> like.productId)
        
        res.status(200).json({success:true, result})
        
    })
})

router.post('/getLikeInfo',(req,res)=>{
    let variable={}
    if(req.body.productId){
        variable={productId:req.body.productId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    
    Like.find(variable)
    .exec((err,likes)=>{
        if(err) res.json({success:false,err})

    
        res.json({success:true,likes})
        //console.log(likes)
        
    })
})
router.post('/getDisLikeInfo',(req,res)=>{
    let variable={}
    if(req.body.productId){
        variable={productId:req.body.productId}
    }
    else{
        variable={commentId:req.body.commentId}
    }
    
    
    DisLike.find(variable)
    .exec((err,disLikes)=>{
        if(err) res.json({success:false,err})

        
        res.json({success:true,disLikes})
    })
})
router.post('/upLike',(req,res)=>{
    let variable={}
    if(req.body.productId){
        variable={productId:req.body.productId,userTo:req.body.userTo}
    }
    else{
        variable={commentId:req.body.commentId,userTo:req.body.userTo}
    }
    
    const like = new Like(variable)
    like.save((err,like)=>{
        if(err) return res.json({success:false,err})
        DisLike.findOneAndDelete(variable)
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            res.json({success:true,like})
            
           
        })
        
    })
    
})
router.post('/downLike',(req,res)=>{
    let variable={}
    if(req.body.productId){
        variable={productId:req.body.productId,userTo:req.body.userTo}
    }
    else{
        variable={commentId:req.body.commentId,userTo:req.body.userTo}
    }
    
    Like.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,result})
        console.log(result);
    })
})
router.post('/upDisLike',(req,res)=>{
    let variable={}
    if(req.body.productId){
        variable={productId:req.body.productId,userTo:req.body.userTo}
    }
    else{
        variable={commentId:req.body.commentId,userTo:req.body.userTo}
    }
   
    const dislike = new DisLike(variable)
    dislike.save((err,dislike)=>{
        if(err) return res.json({success:false,err})
        Like.findOneAndDelete(variable)
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            res.json({success:true,result})
        })
        
       
       
    })
})
router.post('/downDisLike',(req,res)=>{
    let variable={}
    if(req.body.productId){
        variable={productId:req.body.productId,userTo:req.body.userTo}
    }
    else{
        variable={commentId:req.body.commentId,userTo:req.body.userTo}
    }
   
    DisLike.findOneAndDelete(variable)
    .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        res.json({success:true,result})
    })
})

module.exports = router;
