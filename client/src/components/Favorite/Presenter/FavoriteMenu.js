import React from 'react'
import {Menu} from 'antd';
import {Link} from 'react-router-dom';

const FavoriteMenu = () => {
    return (
        <div className="favorite_menu"style={{margin:'16px',height:'24px'}}>
        <Menu style={{display:'flex',justifyContent:'flex-end'}}>
        <Menu.Item className="item" key="like" style={{border:'1px solid gray',borderRadius:'4px',margin:'4px'}}>
        <Link to ='/favorite/like'>좋아요</Link>
        </Menu.Item>
        <Menu.Item className="item" key="dislike" style={{border:'1px solid gray',borderRadius:'4px',margin:'4px'}}>
        <Link to="/favorite/dislike">싫어요</Link>
        </Menu.Item>
        </Menu>
        </div>
    )
}

export default FavoriteMenu
