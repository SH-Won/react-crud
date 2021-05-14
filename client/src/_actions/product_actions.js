
import axios from 'axios';
import {
    UPLOAD_IMAGE,
    

    UPLOAD_PRODUCT,
    GET_PRODUCT,
    REMOVE_PRODUCT,

    
    GET_FIRST_PRODUCT,
    GET_PRODUCT_DETAIL,
    UPDATE_PRODUCT_VIEWS,
    UPDATE_PRODUCT,
    
    GET_USER_FAVORITE,

    ADD_PRODUCT_LIKE,
    SUB_PRODUCT_LIKE,
    ADD_PRODUCT_DISLIKE,
    SUB_PRODUCT_DISLIKE
} from './types';

export function uploadImage(formData,config){
  const request = axios.post('/api/product/uploadfiles',formData,config)
    .then(response=>response.data.url)

    return {
        type:UPLOAD_IMAGE,
        payload:request
    }
    
}

export function uploadProduct(variable){
    const request = axios.post('/api/product/uploadProduct',variable)
    .then(response=> response.data.result)

    return {
        type:UPLOAD_PRODUCT,
        payload:request
    }
} 
export function getProduct(variable){
    
    let vari = JSON.stringify(variable)

    const request =axios.get(`/api/product/getProducts?variable=${vari}`)
    .then(response=>response.data)

    return{
        type:GET_PRODUCT,
        payload:request
    }

}

export function getFirstProduct(variable){
    let vari = JSON.stringify(variable)
    
    const request = axios.get(`/api/product/getProducts?variable=${vari}`)
    .then(response=>response.data)

    return{
        type:GET_FIRST_PRODUCT,
        payload:request
    }
}

export function removeProduct(variable){
    const request = axios.post('/api/product/removeProduct',variable)
    .then(response=>response.data)

    return{
        type:REMOVE_PRODUCT,
        paload:request
    }
}

export function getProductDetail(productId){

    const request = axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
    .then(response=>response.data[0])

    return{
        type:GET_PRODUCT_DETAIL,
        payload:request
    }
}
export function updateView(variable){
    const request =axios.post('/api/product/updateView',variable)
    .then(response=>response.data)

    return{
        type:UPDATE_PRODUCT_VIEWS,
        payload:request
    }
}

export function updateProduct(variable){
    const request=axios.post('/api/product/updateProduct',variable)
    .then(response=>response.data)
    
    return{
        type:UPDATE_PRODUCT,
        payload:request
    }
}
export function addProductLike(variable){
    const request=axios.post('/api/product/addLikeUser',variable)
    .then(response=>response.data)

    return{
        type:ADD_PRODUCT_LIKE,
        payload:request
    }
}
export function subProductLike(variable){
    const request=axios.post('/api/product/subLikeUser',variable)
    .then(response=>response.data)

    return{
        type:SUB_PRODUCT_LIKE,
        payload:request
    }
}
export function addProductDisLike(variable){
    const request=axios.post('/api/product/addDisLikeUser',variable)
    .then(response=>response.data)

    return{
        type:ADD_PRODUCT_DISLIKE,
        payload:request
    }
}
export function subProductDisLike(variable){
    const request=axios.post('/api/product/subDisLikeUser',variable)
    .then(response=>response.data)

    return{
        type:SUB_PRODUCT_DISLIKE,
        payload:request
    }
}
export function getUserFavorite(variable){
    const request=axios.post('/api/product/getUserFavorite',variable)
    .then(response=>response.data)
    return{
        type:GET_USER_FAVORITE,
        payload:request
    }
}
