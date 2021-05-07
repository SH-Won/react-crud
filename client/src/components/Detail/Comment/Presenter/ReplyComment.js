import React, { useState, useEffect } from "react";
import SingleComment from "./SingleComment";

const ReplyComment = ({
  commentList,
  parentCommentId,
  writer,
  deleteComment,
  
  onSubmitComment,
}) => {
  const [OpenReply, setOpenReply] = useState(false);
  const handleOpenReply = () => {
    setOpenReply(!OpenReply);
  };

  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  useEffect(() => {
    let number = 0;
    commentList &&
      commentList.map((comment) => {
        if (comment.responseTo === parentCommentId) {
          number++;
        }
      });
    setChildCommentNumber(number);
  }, [commentList]);

  const renderComment = (CommentId) =>
    commentList &&
    commentList.map(
      (comment, index) =>
        comment.responseTo === CommentId && (
          <div key={`${comment._id}+${index}`} style={{ marginLeft: "40px" }}>
            <SingleComment
              comment={comment}
              onSubmitComment={onSubmitComment}
              writer={writer}
              deleteComment={deleteComment}
            />
            <ReplyComment
              commentList={commentList}
              parentCommentId={comment._id}
              onSubmitComment={onSubmitComment}
              writer={writer}
              deleteComment={deleteComment}
            />
          </div>
        )
    );

  return (
    <div>
      <p onClick={handleOpenReply}>답글 {ChildCommentNumber}개 보기</p>
      {OpenReply && renderComment(parentCommentId)}
    </div>
  );
};

export default ReplyComment;
