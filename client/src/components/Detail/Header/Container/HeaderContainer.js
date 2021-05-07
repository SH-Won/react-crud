import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import HeaderPage from '../Presenter/HeaderPage'
import { getProductDetail,removeProduct} from '../../../../_actions/product_actions';
import '../Presenter/Header.css'
import {addUserCartItem} from '../../../../_actions/user_actions';


const HeaderContainer = ({history,productId}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData, []);
    const product = useSelector(state => state.product.product, []);
    const [selectedImage,setSelectedImage] =useState('');

    useEffect(()=>{
        dispatch(getProductDetail(productId))
        
        
    },[])
   

    useEffect(()=>{
       
       product.images &&
       setSelectedImage(product.images[0])

    },[product.images])
    
    
    const deleteProduct = ()=>{
        let variable={
            productId:productId,
            userTo:user._id
        }
        dispatch(removeProduct(variable))
        .then(response=> history.push('/'))
        
    }
    const selectImage = (image)=>{
        
        setSelectedImage(image)
    }
    const addToCart = (productId)=>{
        dispatch(addUserCartItem(productId));

    }

    return (
        
            <HeaderPage 
            product={product && product} 
            user={user && user._id} 
            deleteProduct={deleteProduct}
            selectedImage={selectedImage} 
            selectImage={selectImage} 
            addToCart={addToCart}
            />
        
    )
}

export default HeaderContainer
