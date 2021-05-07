import React,{useState,useEffect} from 'react'
import UserCartPage from './UserCartPage';
import './Cart.css';
import {useDispatch,useSelector} from 'react-redux';
import {getUserCartItem,removeUserCartItem} from '../../_actions/user_actions';

const CartPage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const [TotalPrice,setTotalPrice]=useState(0);

   // console.log(props.user);

   useEffect(()=>{
       let productIds = [];
       if(user.userData && user.userData.cart){
           if(user.userData.cart.length > 0 ){
               user.userData.cart.forEach(item => 
                productIds.push(item.id))

                dispatch(getUserCartItem(productIds,user.userData.cart))
           }
          
       }

   },[user.userData])

   const removeCartItem = (productId)=>{
     dispatch(removeUserCartItem(productId))
   }

   useEffect(()=>{

   },[])
    

    
    return (

        <div style={{width:'85%',margin:'3rem auto'}}>
            <h1>My Cart</h1>
            <div>
                <UserCartPage
                 products={user.userData && user.cartDetail}
                 removeCartItem={removeCartItem}
                  
                />

                <div style={{marginTop:'3rem'}}>
                    <h2>Total amount $ </h2>
                </div>
        </div>
        </div>
    )
}

export default CartPage
