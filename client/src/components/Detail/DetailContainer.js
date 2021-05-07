import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
      <RecentViewContainer productId={productId} user={user && user._id}/>
      <CommentContainer
        user={user && user._id}
        productId={productId}
        
      />
    </div>
  )
};

export default DetailContainer;
