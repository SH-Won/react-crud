import React,{useState,useEffect} from 'react'
import SingleComment from './SingleComment';

function ReplyComment(props) {
    const [ChildNumber,setChildNumber]=useState(0);
    const [OpenReply,setOpenReply]=useState(false);
    const writer = localStorage.getItem('userId')


    useEffect(()=>{
        let number = 0;
        props.commentList &&
        props.commentList.map(comment=>{
            
            if(comment.responseTo === props.parentCommentId){
                number++;
            }
        })
        setChildNumber(number);
      //  props.updateChildNumber(number);

    },[props.commentList])
    
    const handleOpenReply = ()=>{
        setOpenReply(!OpenReply);
    }

    const renderComment = (parentCommentId) => 
        props.commentList && props.commentList.map((comment,index)=>(
            <React.Fragment key={`${comment._id}+${index}`}>
            {comment.responseTo ===parentCommentId &&
            <div style={{margin:'30px'}}>
            <SingleComment comment={comment} writer={props.writer} productId={props.productId}/>
            <ReplyComment commentList={props.commentList} writer={props.writer} productId={props.productId} parentCommentId={comment._id}/>
            </div>
            } 
            </React.Fragment>   
        ))
    


    return (
        <div>
            {ChildNumber >0 &&
            <p style={{marginBottom:'10px'}} onClick={handleOpenReply}>답글 {ChildNumber}개 보기</p>
            } 
            
            {OpenReply &&
            <div style={{}}>
            {renderComment(props.parentCommentId)}
            </div>
            }
        </div>
    )
}

export default ReplyComment
