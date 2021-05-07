import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import LikeDislike from '../Presenter/LikeDislike';
import {addCommentLikeUser,
        subCommentLikeUser,
        addCommentDisLikeUser,
        subCommentDisLikeUser} from '../../../../_actions/comment_actions';


const LikeDisLikePage = ({comment,writer,productId}) => {
    const dispatch = useDispatch();
    const [LikeNumber,setLikeNumber]=useState(0);
    const [DisLikeNumber,setDisLikeNumber]=useState(0);
    const [Liked,setLiked]=useState(false)
    const [DisLiked,setDisLiked]=useState(false);

    
    useEffect(()=>{
        
        setLikeNumber(comment.likeUser.length)
        setDisLikeNumber(comment.disLikeUser.length)

        comment && comment.likeUser.map(user=>{
            console.log(user,typeof user)
            console.log(writer,typeof writer)
            if(user===writer){
                console.log('확인')
                setLiked(true)
            }
        })
        comment && comment.disLikeUser.map(user=>{
            if(user===writer){
                setDisLiked(true)
            }
        })

    },[writer])
    
    console.log('코멘트 좋아요 렌더링')
    const onLike =()=>{
        let variable={
            commentId:comment._id,
            user:writer,
            productId:comment.productId
        }
        if(Liked === false){
            dispatch(addCommentLikeUser(variable))
            setLikeNumber(LikeNumber+1)
            setLiked(true)
            if(DisLiked ===true){
                setDisLikeNumber(DisLikeNumber-1)
                setDisLiked(false)
            }
            
        }
        else{
            dispatch(subCommentLikeUser(variable))
            setLikeNumber(LikeNumber-1)
            setLiked(false)
        }
     
    }
    const onDisLike = (commentId)=>{
        let variable ={
            commentId:comment._id,
            user:writer,
            productId:comment.productId
        }
        if(DisLiked === false){
            dispatch(addCommentDisLikeUser(variable))
            setDisLikeNumber(DisLikeNumber+1)
            setDisLiked(true)
            if(Liked ===true){
                setLikeNumber(LikeNumber-1)
                setLiked(false)
            }
        }
        else{
            dispatch(subCommentDisLikeUser(variable))
            setDisLikeNumber(DisLikeNumber-1)
            setDisLiked(false)
        }
    }

    return (
       <LikeDislike 
       comment={comment}
       LikeNumber={LikeNumber}
       DisLikeNumber={DisLikeNumber}
       Liked={Liked}
       DisLiked={DisLiked}
       onLike={onLike}
       onDisLike={onDisLike}
       />
    )
}

export default LikeDisLikePage
