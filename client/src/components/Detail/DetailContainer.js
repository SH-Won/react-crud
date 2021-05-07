import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBoardProduct,getFirstProduct,getProductDetail } from "../../_actions/product_actions";
import {
  getComments,
  saveComment,
  DeleteComment,
} from "../../_actions/comment_actions";
//import {recentlyView } from '../../_actions/user_actions';
//import DetailPage from "../../Component/Detail/DetailPage";
//import Comments from "../../Component/Detail/Comments";
//import RecentView from '../../Component/Detail/RecentView';
//import Board from '../../Component/Detail/Board'


import HeaderContainer from './Header/Container/HeaderContainer';
import BoardContainer from './Board/Container/BoardContainer';
import RecentViewContainer from './RecentView/Container/RecentViewContainer'
import CommentContainer from './Comment/Container/CommentContainer.js'
import LikeContainer from './ProductLikeDislike/Container/LikeContainer'
const DetailContainer = (props) => {
 
  const productId = props.match.params.productId;
  const user = useSelector((state) => state.user.userData, []);
  const writer = { ...user };
 
  return (
    <div>
      <HeaderContainer history={props.history} productId={productId}/>
      <LikeContainer productId={productId} user={user && user._id}/>
      <BoardContainer productId={productId} />
      <div style={{display:'flex',width:'100%'}}>
      
      
      </div>
      <RecentViewContainer productId={productId} writer={writer._id}/>
      <CommentContainer
        writer={writer._id}
        productId={productId}
        
      />
    </div>
  )
};

export default DetailContainer;
