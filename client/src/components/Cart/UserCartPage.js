import React from 'react'
import {Button} from 'antd';

const UserCartPage = ({products,removeCartItem}) => {

    const renderUserCartItem =() => (products && products.length) >0 &&
    products.map((product,index)=>{
        return <tr key={index}>
            <th><img style={{width:'80px',height:'80px'}}src={product.images[0]}/></th> 
            <th>{product.quantity} 개</th>
            <th>{product.price}</th>
            <th><Button onClick={()=>removeCartItem(product._id)}>삭제</Button></th>
        </tr>
    })
    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Product Image</th>
                    <th>Product Quantity</th>
                    <th>Product Price</th>
                    <th>Remove from Cart</th>
                </tr>
            </thead>
            <tbody>
                {renderUserCartItem()}
            </tbody>
        </table>
        
    </div>
    )
}

export default UserCartPage
