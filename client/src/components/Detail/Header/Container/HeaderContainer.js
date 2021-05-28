import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import HeaderPage from '../Presenter/HeaderPage'
import { getProductDetail,removeProduct} from '../../../../_actions/product_actions';
import '../Presenter/Header.css'



const HeaderContainer = (props) => {
    const {history,productId} =props;

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userData, []);
    const product = useSelector(state => state.product.product, []);
    const [selectedImage,setSelectedImage] =useState('');
    //const [deleteState,setDeleteState]=useState(false);
    useEffect(()=>{
       
        dispatch(getProductDetail(productId))
        
    },[])
   

    useEffect(()=>{
       
       product.images &&
       setSelectedImage(product.images[0])

    },[product.images])
    console.log(product);
    
    
    const deleteProduct = ()=>{
        
        let variable={
            productId:productId,
            userTo:user._id
        }

        dispatch(removeProduct(variable))
        
            
            history.push('/')
            
        
    }
    const selectImage = (image)=>{
        
        setSelectedImage(image)
    }
  
    

    return (
        
            <HeaderPage 
            product={product && product} 
            user={user && user._id} 
            deleteProduct={deleteProduct}
            selectedImage={selectedImage} 
            selectImage={selectImage} 
            />
        
    )
}

export default HeaderContainer
