import React from 'react'
import { Descriptions,Button} from 'antd'

const HeaderInfo = ({product,user,deleteProduct,addToCart}) => {
   
    return (
        <div style={{margin:'1rem auto'}}>
        <Descriptions bordered>
            <Descriptions.Item label="제목">{product.title}</Descriptions.Item>
            <Descriptions.Item label="내용">{product.description}</Descriptions.Item>
            <Descriptions.Item label="작성자">{product.writer && product.writer.name}</Descriptions.Item>
        
        </Descriptions>
        <br/>
        {
        product.writer && product.writer._id == user && 
        <div>
        <Button><a href={`/product/edit/${product._id}`}>수정</a></Button>
        <Button onClick={deleteProduct}>삭제</Button>
        </div>
        }
        {
        user && 
         <Button onClick={()=>addToCart(product._id)}>장바구니</Button>
        }
        
        
            
        </div>
    )
}

export default HeaderInfo
