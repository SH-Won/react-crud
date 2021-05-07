import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {
    getComments,
    saveComment,
    DeleteComment,
  } from "../../../../_actions/comment_actions";
import Comments from '../Presenter/Comments'
const CommentContainer = ({productId,user}) => {
    const dispatch =useDispatch();
    
   
    useEffect(()=>{
        let variable = {
            productId: productId,
          };
          dispatch(getComments(variable));
    },[])
    const commentList = useSelector((state) => state.comment.comments, []);
  
    
    const onSubmitComment = (CommentValue, commentId) => {
        let variable = {};
        !commentId
          ? (variable = {
              writer: user,
              content: CommentValue,
              productId: productId,
            })
          : (variable = {
              writer: user,
              content: CommentValue,
              productId: productId,
              responseTo: commentId,
            });
    
        dispatch(saveComment(variable));
      };
    
      const deleteComment = (commentId) => {
        let variable = {
          productId: productId,
          commentId: commentId,
        };
        dispatch(DeleteComment(variable));
      };
      
    return (
        <Comments 
        user={user}
        productId={productId}
        commentList={commentList}
        onSubmitComment={onSubmitComment}
        deleteComment={deleteComment}
        />
    )
}

export default CommentContainer
