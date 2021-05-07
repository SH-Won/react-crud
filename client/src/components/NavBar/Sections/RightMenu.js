/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu ,Badge,Icon} from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
         <Menu.Item key="cart">
          <Badge count={user.userData && user.userData.cart.length}>
          <a href='/user/cart' style={{marginRight:-22,color:'#667777'}}>
            <Icon type="shopping-cart" style={{fontSize:30,marginBottom:4}}/>
          </a>
          </Badge>
        </Menu.Item>
        <Menu.Item key="upload">
          <a href="/upload">글 올리기</a>
        </Menu.Item>
        <Menu.Item key="logout">
          <a onClick={logoutHandler}>로그아웃</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

