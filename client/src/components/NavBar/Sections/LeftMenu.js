import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/">홈</a>
    </Menu.Item>
    <Menu.Item key="favorite">
      <a href="/favorite/like">좋아요</a>
    </Menu.Item>
   
   
  </Menu>
  )
}

export default LeftMenu