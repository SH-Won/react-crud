import {
    SAVE_COMMENT,
    GET_COMMENTS,
    DELETE_COMMENT,

    ADD_COMMENT_LIKE_USER,
    SUB_COMMENT_LIKE_USER,
    ADD_COMMENT_DISLIKE_USER,
    SUB_COMMENT_DISLIKE_USER
} from '../_actions/types';




export default function(state={},action){
    switch(action.type){
        case SAVE_COMMENT :
            return{
                ...state, comments:[...state.comments,...action.payload.comment]
            }
        case GET_COMMENTS :
            return{
                ...state, comments:[...action.payload.comments]
            }
        case DELETE_COMMENT:
            return{
                ...state, comments:[...action.payload.comments]
            }

        case ADD_COMMENT_LIKE_USER:
            return{
                ...state, comments:[...action.payload.comments]
            }
        case SUB_COMMENT_LIKE_USER:
            return{
                ...state, comments:[...action.payload.comments]
            }
        case ADD_COMMENT_DISLIKE_USER:
            return{
                ...state, comments:[...action.payload.comments]
            }
        case SUB_COMMENT_DISLIKE_USER:
            return{
                ...state, comments:[...action.payload.comments]
            }
        
        default:
            return state;
    }
}