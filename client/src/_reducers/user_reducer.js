import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_USER_CART_ITEM,
    GET_USER_CART_ITEM,
    REMOVE_USER_CART_ITEM,


    RECENTLY_VIEW_USER
} from '../_actions/types';
 

export default function(state={views:[]},action){
    switch(action.type){
        case REGISTER_USER:
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        case RECENTLY_VIEW_USER:
            return{
                  ...state, views:[...action.payload]
                /* ...state, userData:{
                     ...state, views:[...action.payload]
                 }
                 */
            }
        case ADD_USER_CART_ITEM:
            return{
                ...state,
                userData:{
                    ...state.userData,
                    cart:action.payload
                }
            }
        case GET_USER_CART_ITEM:
            return{
                ...state,
                cartDetail:action.payload
            }
        case REMOVE_USER_CART_ITEM:
            return{
                ...state,
                userData:{
                    ...state.userData,
                    cart:action.payload.cart
                },
                cartDetail:action.payload.cartDetail
            }
        default:
            return state;
    }
}