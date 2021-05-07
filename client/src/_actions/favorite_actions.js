import axios from 'axios';
import {
    GET_LIKE_INFO,
    GET_DISLIKE_INFO,
    UP_LIKE,
    DOWN_LIKE,
    UP_DISLIKE,
    DOWN_DISLIKE,
    GET_LIKE

} from './types';



export  function getLike(variable){
  /*  let variable={
        userTo:user
    }
   */
    const request =  axios.post('/api/likeDisLike/getFavoriteProduct',variable)
    .then(response=>response.data)

    return{
        type:GET_LIKE,
        payload:request
    }
}
export function getLikeInfo(variable){

   

    const request = axios.post('/api/likeDisLike/getLikeInfo',variable)
    .then(response=>response.data)

    return {
        type:GET_LIKE_INFO,
        payload:request
    }

}
export function getDisLikeInfo(variable){
    
    const request = axios.post('/api/likeDisLike/getDisLikeInfo',variable)
    .then(response=>response.data)
    
    return {
        type:GET_DISLIKE_INFO,
        payload:request
    }
}
export function upLike(variable){
   
    const request =axios.post('/api/likeDisLike/upLike',variable)
    .then(response=>response.data)

    return{
        type:UP_LIKE,
        payload:request
    }
}
export function downLike(variable){
   
    const request =axios.post('/api/likeDisLike/downLike',variable)
    .then(response=>response.data)

    return{
        type:DOWN_LIKE,
        payload:request
    }

}
export function upDisLike(variable){
    
    const request =axios.post('/api/likeDisLike/upDisLike',variable)
    .then(response=>response.data)

    return{
        type:UP_DISLIKE,
        payload:request
    }
}
export function downDisLike(variable){
   
    const request =axios.post('/api/likeDisLike/downDisLike',variable)
    .then(response=>response.data)

    return{
        type:DOWN_DISLIKE,
        payload:request
    }

}


