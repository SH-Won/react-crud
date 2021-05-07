
import axios from 'axios';
import {
    UPLOAD_IMAGE,
    DELETE_IMAGE,
    PREVIEW_IMAGE,

    UPLOAD_PRODUCT,
    GET_PRODUCT,
    DELETE_PRODUCT,
    REMOVE_PRODUCT,

    GET_FILTER_PRODUCT,
    GET_SEARCH_PRODUCT,
    GET_FIRST_PRODUCT,
    GET_PRODUCT_DETAIL,
    UPDATE_PRODUCT_VIEWS,
    UPDATE_PRODUCT,
    GET_BOARD_PRODUCT,
    GET_USER_FAVORITE,

    ADD_PRODUCT_LIKE,
    SUB_PRODUCT_LIKE,
    ADD_PRODUCT_DISLIKE,
    SUB_PRODUCT_DISLIKE
} from './types';

export function previewImage(fileURL){
    let ImageArray =[];
    ImageArray = [...fileURL]
    const request =[...ImageArray]

    return{
        type:PREVIEW_IMAGE,
        payload:request
    }
}
export function uploadImage(formData,config){
  const request = axios.post('/api/product/uploadfiles',formData,config)
    .then(response=>response.data.url)

    return {
        type:UPLOAD_IMAGE,
        payload:request
    }
    
}
export function deleteImages(image,imageArray){
    const current = imageArray.indexOf(image)
    imageArray.splice(current,1)

    const request = [...imageArray]

    return {
        type:DELETE_IMAGE,
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
export function getFirstProduct(skip,limit,filters,searchTerm){
    let variable={
        skip:skip,
        limit:limit,
        filters:filters,
        searchTerm:searchTerm
        
    }
    
    const request = axios.post('/api/product/getFirstProducts',variable)
    .then(response=>response.data)

    return{
        type:GET_FIRST_PRODUCT,
        payload:request
    }
}
export function getBoardProduct(skip,limit,filters,searchTerm){
    let variable={
        skip:skip,
        limit:limit,
        filters:filters,
        searchTerm:searchTerm
        
    }
    const request = axios.post('/api/product/getBoardProducts',variable)
    .then(response=>response.data.boardProducts)

    return{
        type:GET_BOARD_PRODUCT,
        payload:request
    }
}
export function getProduct(skip,limit,filters,searchTerm){
    let variable={
        skip:skip,
        limit:limit,
        filters:filters,
        searchTerm:searchTerm
    }
    
    const request = axios.post('/api/product/getProducts',variable)
    .then(response=>response.data)

    return{
        type:GET_PRODUCT,
        payload:request
    }
}
export function getFilterProduct(skip,limit,filters,searchTerm){
    let variable={
        skip:skip,
        limit:limit,
        filters:filters,
        searchTerm:searchTerm
    }
    
    const request = axios.post('/api/product/getFilterProduct',variable)
    .then(response=>response.data)

    return{
        type:GET_FILTER_PRODUCT,
        payload:request
    }
}
export function getSearchProduct(skip,limit,filters,searchTerm){
    let variable={
        skip:skip,
        limit:limit,
        filters:filters,
        searchTerm:searchTerm
    }
    
    const request = axios.post('/api/product/getSearchProduct',variable)
    .then(response=>response.data)

    return{
        type:GET_SEARCH_PRODUCT,
        payload:request
    }
}
export function deleteProduct(product_id,writer,skip,limit,filters,searchTerm){
  /*  const current = productArray.indexOf(product)
    productArray.splice(current,1)
    const r = [...productArray]
  */

    let variable={
        _id:product_id,
        writer:writer,
        skip:skip,
        limit:limit,
        filters:filters,
        searchTerm:searchTerm
    }
    const request =axios.post('/api/product/deleteProduct',variable)
    .then(response=>response.data)

    return {
        type:DELETE_PRODUCT,
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
