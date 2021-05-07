import React, { useState } from "react";
import { Form, Button, Input, Comment, Avatar } from "antd";
import LikeDisLikePage from '../../LikeDislike/Container/LikeDisLikePage'

const { TextArea } = Input;

const SingleComment = ({ comment, onSubmitComment, writer, deleteComment,productId }) => {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState("");
  const handleOpenReply = () => {
    setOpenReply(!OpenReply);
  };
  const onChangeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };
  const deleteButton = [
    <LikeDisLikePage comment={comment} writer={writer} productId={productId}/>,
    <Button onClick={handleOpenReply}>답글 달기</Button>,
    (writer === comment.writer._id && comment.content !== "삭제된 댓글 입니다")
      ? <Button onClick={() => deleteComment(comment._id)}> 삭제 </Button>
      : "",
  ];

  return (
    <div>
      <Comment
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} />}
        content={comment.content}
        actions={deleteButton}
      />
      

      {OpenReply && (
        <Form onSubmit={() => onSubmitComment(CommentValue, comment._id)}>
          <TextArea value={CommentValue} onChange={onChangeCommentValue} />
          <Button
            onClick={() => {
              onSubmitComment(CommentValue, comment._id);
              setOpenReply(!OpenReply);
              setCommentValue("");
            }}
          >
            댓글 달기
          </Button>
        </Form>
      )}
    </div>
  );
};

export default SingleComment;
