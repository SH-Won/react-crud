import React from 'react'
import { Button} from 'antd'

const HeaderInfo = ({product,user,deleteProduct,addToCart}) => {
   
    return (
        <div style={{width:'100%',margin:'1rem auto'}}>
        <div className="detail-header-description-container">
            <div className="information-right">
                <h2>{product.title}</h2>
                <dl className="detail-header-description">
                    <dt>설명</dt>
                    <dd><span>{product.description}</span></dd>

                </dl>
                
            </div>
            
            
        </div>
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
