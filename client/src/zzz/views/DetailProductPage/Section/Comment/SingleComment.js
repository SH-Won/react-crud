import React,{useState}from 'react'
import {Input,Button,Form,Comment,Avatar} from 'antd';
import {useDispatch} from 'react-redux';

import {saveComment,DeleteComment} from '../../../../../_actions/comment_actions'
import LikeDisLike from '../LikeDisLike';
const {TextArea} =Input;

function SingleComment(props) {
    const [CommentValue,setCommentValue]=useState('');
    const dispatch = useDispatch();
    const [OpenReply,setOpenReply]=useState(false);

    const [ChildNumber,setChildNumber]=useState(0);
  //  const [OpenReplyComment,setOpenReplyComment]=useState(false);

    const onChangeComment = (e)=>{
        setCommentValue(e.target.value);
    }
    const onSubmit =(e)=>{
        e.preventDefault();

        let variable={
            writer:props.writer,
            productId:props.productId,
            content:CommentValue,
            responseTo:props.comment._id

        }
        dispatch(saveComment(variable))
        setCommentValue('');
        setOpenReply(!OpenReply)
    }
    const handleOpenReply = (e)=>{
        e.preventDefault()
        setOpenReply(!OpenReply);
    }
   /* const updateChildNumber = (number)=>{
        setChildNumber(number);
    }
    const openReplyComment= ()=>{
        setOpenReplyComment(!OpenReplyComment);
    }*/
    const deleteComment = (productId,commentId) =>{
        
        let variable={
            productId:productId,
            commentId:commentId
        }
        dispatch(DeleteComment(variable))
    }



    // const viewReplyComment = ChildNumber >0 && [<span onClick={openReplyComment}>답글 {ChildNumber}개 보기</span>]
    const actions =[
      <LikeDisLike comment commentId={props.comment._id} userTo={props.writer}/>,
      <Button style={{margin:'8px',fontSize:'12px'}}onClick={handleOpenReply}> 답글 달기</Button>,
      props.writer===props.comment.writer._id && props.comment.content !=='삭제된 댓글 입니다' ? <Button style={{fontSize:'12px'}}onClick={()=>deleteComment(props.productId,props.comment._id)}>삭제</Button> :''
      ]
  
        
      
    return (
        <div style={{fontSize:'20px'}}>
            
            <Comment
            avatar={<Avatar src={props.comment.writer.image}></Avatar>}
            author={props.comment.writer.name}
            content={props.comment.content}
            actions={actions}
            />
            
            
            
            
           {OpenReply &&
             <Form onSubmit={onSubmit}>
                <TextArea
                   value={CommentValue}
                   onChange={onChangeComment}
                   />
                <br/>
                <Button onClick={onSubmit}>
                    댓글 달기
                </Button>

            </Form>
            }
            
        </div>
    )
}

export default SingleComment
