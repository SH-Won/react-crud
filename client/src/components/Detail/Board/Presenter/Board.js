import React from 'react'
import Paging from './Paging';
import {List,Divider} from 'antd'


const Board = ({CurrentPage,Pages,board_products,onChangePage}) => {

    
    return (
        <div style={{width:'80%', margin:'1rem auto'}}>
            <Divider orientation="left">게시글</Divider>
            <List 
            header
            footer
            bordered
            dataSource={board_products}
            renderItem={product=>(
                <List.Item style={{textDecoration:'none'}}>
                 <a href={`/product/${product._id}`}>{product.title}</a>
                </List.Item>
            )}
            
            />
            <Paging CurrentPage={CurrentPage} Pages={Pages} onChangePage={onChangePage}/>
        </div>
    )
}

export default Board
