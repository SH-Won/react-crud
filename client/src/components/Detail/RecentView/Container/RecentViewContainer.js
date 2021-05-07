import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {recentlyView} from '../../../../_actions/user_actions'
import RecentView from '../Presenter/RecentView';
import '../Presenter/RecentView.css';
const RecentViewContainer = ({productId,user}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        
        let variable = {
            product:productId,
            userTo:user
          }
     user && dispatch(recentlyView(variable))
        
    },[user])
   
    const userView = useSelector(state=>state.user.views);
    const userRecentView = userView && userView.map(view => view.product)
   
    return (

        <RecentView userRecentView={userRecentView && userRecentView} />
    )
}

export default RecentViewContainer
