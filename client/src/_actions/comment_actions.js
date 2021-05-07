import axios from 'axios';
import {
    SAVE_COMMENT,
    GET_COMMENTS,
    DELETE_COMMENT,

    ADD_COMMENT_LIKE_USER,
    SUB_COMMENT_LIKE_USER,
    ADD_COMMENT_DISLIKE_USER,
    SUB_COMMENT_DISLIKE_USER

} from './types';

export function saveComment(variable){
    const request = axios.post('/api/comment/saveComment',variable)
    .then(response=>response.data)

    return{
        type:SAVE_COMMENT,
        payload:request
    }
}
export function getComments(variable){
    const request =axios.post('/api/comment/getComments',variable)
    .then(response=>response.data)
    return{
        type:GET_COMMENTS,
        payload:request
    }
}
export function DeleteComment(variable){
    const request =axios.post('/api/comment/deleteComment',variable)
    .then(response=>response.data)
    return{
        type:DELETE_COMMENT,
        payload:request
    }
}

export function addCommentLikeUser(variable){
    const request = axios.post('/api/comment/upLikeUser',variable)
    .then(response=>response.data)
    return{
        type:ADD_COMMENT_LIKE_USER,
        payload:request
    }
}

export function subCommentLikeUser(variable){
    const request = axios.post('/api/comment/downLikeUser',variable)
    .then(response=>response.data)
    return{
        type:SUB_COMMENT_LIKE_USER,
        payload:request
    }
}
export function addCommentDisLikeUser(variable){
    const request = axios.post('/api/comment/upDisLikeUser',variable)
    .then(response=>response.data)
    return{
        type:ADD_COMMENT_DISLIKE_USER,
        payload:request
    }
}
export function subCommentDisLikeUser(variable){
    const request = axios.post('/api/comment/downDisLikeUser',variable)
    .then(response=>response.data)
    return{
        type:SUB_COMMENT_DISLIKE_USER,
        payload:request
    }
}