import {
    UPLOAD_IMAGE,
    

    UPLOAD_PRODUCT,
    GET_PRODUCT,
    DELETE_PRODUCT,
    REMOVE_PRODUCT,

    
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
}
from '../_actions/types'
let initialState = 
{
    previewImages:[],
    images:[],
    products:[],
    postSize:0,
    product:[],
    boardProducts:[],
    userLikeProducts:[],
    userDisLikeProducts:[]
}

export default function(state=initialState,action){
    switch(action.type){


        case UPLOAD_IMAGE :
            return{
                ...state, images:[...state.images,...action.payload]
            }

        case UPLOAD_PRODUCT:
            return{
                ...state 
              
            }
        case GET_FIRST_PRODUCT:
            return{
                ...state,
                products:[...action.payload.products],
                
                postSize:action.payload.postSize
            }
        case GET_BOARD_PRODUCT:
            return {
                ...state,
                boardProducts:[...action.payload]
            }    
        case GET_PRODUCT:
            return{
                ...state, products:[...state.products,...action.payload.products]
                ,postSize:action.payload.postSize
               
            }
        case DELETE_PRODUCT:
            return{
                ...state,
               products:[...action.payload.products]
               
            }

        case REMOVE_PRODUCT:
            return{
                ...state,
            }   
            
        case GET_PRODUCT_DETAIL:
            return{
                ...state,
                product:action.payload
            }
        case UPDATE_PRODUCT_VIEWS :
            return{
                ...state
            }
        case UPDATE_PRODUCT :
            return{
                ...state
            }
        case GET_USER_FAVORITE:
            return{
                ...state,userLikeProducts:[...action.payload.likeProducts],
                userDisLikeProducts:[...action.payload.disLikeProducts]
            }
        case ADD_PRODUCT_LIKE :
            return{
                ...state,product:action.payload.product[0],
            }
        case SUB_PRODUCT_LIKE :
            return{
                ...state,product:action.payload.product[0]
            }
        case ADD_PRODUCT_DISLIKE :
            return{
                ...state,product:action.payload.product[0]
            }
        case SUB_PRODUCT_DISLIKE :
            return{
                ...state,product:action.payload.product[0]
            }
        
        default:
            return state;
    }
}