import { combineReducers } from 'redux';
import user from './user_reducer';
import product from './product_reducer';
import favorite from './favorite_reducers';
import comment from './comment_reducers';

const rootReducer = combineReducers({
    user,
    product,
    favorite,
    comment
});

export default rootReducer;