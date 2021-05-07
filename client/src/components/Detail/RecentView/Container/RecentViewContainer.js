import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {recentlyView} from '../../../../_actions/user_actions'
import RecentView from '../Presenter/RecentView';
import '../Presenter/RecentView.css';
const RecentViewContainer = ({productId,writer}) => {
    const dispatch = useDispatch();

    useEffect(()=>{
        
        let variable = {
            product:productId,
            userTo:writer
          }
     writer && dispatch(recentlyView(variable))
        
    },[writer])
    //console.log(writer)
    const userView = useSelector(state=>state.user.views);
    const userRecentView = userView.map(view => view.product)
   
    return (

        <RecentView userRecentView={userRecentView} />
    )
}

export default RecentViewContainer
