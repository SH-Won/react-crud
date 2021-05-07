const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");


router.post('/saveComment',(req,res)=>{
    const comment = new Comment(req.body)
    comment.save((err,comments)=>{
        if(err) res.json({success:false,err})
        Comment.find({'_id':comments._id})
        .populate('writer')
        .exec((err,comment)=>{
            if(err) res.json({success:false,err})
            res.json({success:true,comment})
        })
    })
})
router.post('/getComments',(req,res)=>{
    Comment.find({productId:req.body.productId})
    .populate('writer')
    .exec((err,comments)=>{
        if(err) res.json({success:false,err})
        res.json({success:true,comments})
    })
})
router.post('/deleteComment',(req,res)=>{
    Comment.findOneAndUpdate({productId:req.body.productId,_id:req.body.commentId}
        ,{$set:{content:'삭제된 댓글 입니다'}})
    .exec((err,result)=>{
        if(err) return res.json({success:false,err})
        Comment.find({productId:req.body.productId})
        .populate('writer')
        .exec((err,comments)=>{
            if(err) return res.json({success:false,err})
            res.json({success:true,comments})
        })
    })

})

router.post('/upLikeUser',(req,res)=>{
    Comment.findOneAndUpdate({_id:req.body.commentId},
        {$push:{likeUser:req.body.user},$pull:{disLikeUser:req.body.user}})
        //{$pull:{'disLikeUser':req.body.user}})
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            Comment.find({productId:req.body.productId})
            .populate('writer')
            .exec((err,comments)=>{
                if(err) return res.json({success:false,err})
                res.status(200).json({success:true,comments})
                console.log(comments)
            })
        })

})
router.post('/downLikeUser',(req,res)=>{
    Comment.findOneAndUpdate({_id:req.body.commentId},
        {$pull:{likeUser:req.body.user}})
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            Comment.find({productId:req.body.productId})
            .populate('writer')
            .exec((err,comments)=>{
                if(err) return res.json({success:false,err})
                res.status(200).json({success:true,comments})
                console.log(comments)
            })
        })
})

router.post('/upDisLikeUser',(req,res)=>{
    Comment.findOneAndUpdate({_id:req.body.commentId},
        {$push:{disLikeUser:req.body.user},$pull:{likeUser:req.body.user}})
        
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            Comment.find({productId:req.body.productId})
            .populate('writer')
            .exec((err,comments)=>{
                if(err) return res.json({success:false,err})
                res.status(200).json({success:true,comments})
                console.log(comments)
            })
        })

})
router.post('/downDisLikeUser',(req,res)=>{
    Comment.findOneAndUpdate({_id:req.body.commentId},
        {$pull:{disLikeUser:req.body.user}})
        .exec((err,result)=>{
            if(err) return res.json({success:false,err})
            Comment.find({productId:req.body.productId})
            .populate('writer')
            .exec((err,comments)=>{
                if(err) return res.json({success:false,err})
                res.status(200).json({success:true,comments})
                console.log(comments)
            })
        })
})









module.exports = router;
