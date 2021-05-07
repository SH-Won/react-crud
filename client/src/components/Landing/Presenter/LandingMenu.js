import React from 'react'
import {Link} from 'react-router-dom';
import {Menu} from 'antd';

const LandingMenu = () => {
    return (
        <div style={{margin:'16px'}}>
        <Menu style={{display:'flex',justifyContent:'flex-end'}}>
        <Menu.Item key="full" style={{border:'1px solid gray',borderRadius:'4px',margin:'4px'}}>
        <Link to ='/'>전체 게시글</Link>
        </Menu.Item>
        <Menu.Item key="user" style={{border:'1px solid gray',borderRadius:'4px',margin:'4px'}}>
        <Link to="/user">내가 쓴 글</Link>
        </Menu.Item>
        </Menu>
        </div>
    )
}

export default LandingMenu
