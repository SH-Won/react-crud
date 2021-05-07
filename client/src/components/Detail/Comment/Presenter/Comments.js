import React, { useState,useEffect} from "react";
import { Row, Col, Form, Button, Input } from "antd";
import SingleComment from "./SingleComment";
import ReplyComment from "./ReplyComment";
const { TextArea } = Input;

const Comments = ({
  commentList,
  onSubmitComment,
  user,
  deleteComment,
  productId
 
}) => {
  const [CommentValue, setCommentValue] = useState("");
  const onChangeCommentValue = (e) => {
    setCommentValue(e.target.value);
  };

  return (
    <div style={{ width: "90%", margin: "2rem auto" }}>
      <div
        style={{
          width: "100%",
          margin: "2rem auto",
          
          display: "flex",
          height:'400px',
          flexDirection: "column",
          flexWrap: "nowrap",
          border: "0.1px solid gray",
          borderRadius: "8px",
          padding: "16px",
          overflow: "auto",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            {commentList &&
              commentList.map(
                (comment, index) =>(
                  (!comment.responseTo && 
                    <div key={`${comment._id}+${index}`}>
                      <SingleComment
                        comment={comment}
                        onSubmitComment={onSubmitComment}
                        user={user}
                        deleteComment={deleteComment}
                        productId={productId}
                      />
                      <ReplyComment
                        user={user}
                        parentCommentId={comment._id}
                        commentList={commentList}
                        onSubmitComment={onSubmitComment}
                        deleteComment={deleteComment}
                      />
                    </div>
                  )
              ))}
          </Col>
        </Row>
      </div>

      <h3>댓글 쓰기</h3>
      <hr />
      <Form onSubmit={() => onSubmitComment(CommentValue)}>
        <TextArea value={CommentValue} onChange={onChangeCommentValue} />
        <Button onClick={() =>onSubmitComment(CommentValue)}>댓글 달기</Button>
      </Form>
    </div>
  );
};

export default Comments;
