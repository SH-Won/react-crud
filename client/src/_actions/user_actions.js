import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_USER_CART_ITEM,
    GET_USER_CART_ITEM,
    REMOVE_USER_CART_ITEM,


    RECENTLY_VIEW_USER
} from './types';
import { USER_SERVER } from '../components/Config';

export function registerUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axios.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function recentlyView(variable){
    const request =axios.post('/api/product/recentlyView',variable)
    .then(response=>response.data.views)

    return {
        type:RECENTLY_VIEW_USER,
        payload:request
    }
}
export function addUserCartItem(productId){
    const request = axios.get(`${USER_SERVER}/addUserCartItem?productId=${productId}`)
    .then(response => response.data)

    return{
        type:ADD_USER_CART_ITEM,
        payload:request
    }
}
export function getUserCartItem(productIds,userCart){
    const request=axios.get(`/api/product/getUserCartItem?productIds=${productIds}&type=array`)
    .then(response=>{
        userCart.forEach(item=>{
            response.data.forEach((product,index)=>{
                if(item.id === product._id){
                    response.data[index].quantity = item.quantity;
                }
            })
        })
        return response.data;
    })

    return{
        type:GET_USER_CART_ITEM,
        payload:request
    }
}
export function removeUserCartItem(productId){
    const request = axios.get(`${USER_SERVER}/removeUserCartItem?productId=${productId}`)
    .then(response=>{
        response.data.cart.forEach(item=>{
            response.data.cartDetail.forEach((product,index)=>{
                if(item.id === product._id){
                    response.data.cartDetail[index].quantity= item.quantity;
                }
            })
        })
        return response.data
    })

    return{
        type:REMOVE_USER_CART_ITEM,
        payload:request
    }
}
