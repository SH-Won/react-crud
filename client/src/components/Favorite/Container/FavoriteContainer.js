import React,{useState,useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { getUserFavorite,subProductLike,subProductDisLike} from '../../../_actions/product_actions';
import Favorite from '../Presenter/Favorite';
import FavoriteMenu from '../Presenter/FavoriteMenu';
import {Route,Switch} from 'react-router-dom';



const FavoriteContainer = () => {
    const dispatch = useDispatch()
    const user =useSelector(state=>state.user.userData);
    const user_id={...user}
    const userId=user_id._id;
    //console.log(userId)
   // const userId = localStorage.getItem('userId');
    
    const [Filters,setFilters]=useState({likeUser:[],disLikeUser:[]})
    const [Fresh,setFresh] = useState(false);
     //{category : [ '4' ]}
     const [ID,setID]=useState()
     
    useEffect(()=>{
      /*  let newFilters ={...Filters}
        userId &&
        newFilters['likeUser'].push(userId)
        setFilters(newFilters)
        console.log(newFilters)
        
*/      
      
        
        let variable={
            user:userId
        }
        userId &&
        dispatch(getUserFavorite(variable))

        setFresh(false);
    
    },[userId,Fresh])

    

    const userLikeProducts = useSelector(state=>state.product.userLikeProducts)
    const userDisLikeProducts=useSelector(state=>state.product.userDisLikeProducts)

    //const userlike = useMemo(() => function input);
    const deleteLike =(productId)=>{
        let variable={
            productId:productId,
            user:userId

        }
        dispatch(subProductLike(variable))
        setFresh(true)
    }

    const deleteDisLike =(productId)=>{
        let variable={
            productId:productId,
            user:userId

        }
        dispatch(subProductDisLike(variable))
        setFresh(true)
    }

   const renderSanaFey = <img src={`http://localhost:5000/
    uploads\\1F4BF452-D141-4A0A-B80A-0629105411E5.gif`}/>
      


    return (
        <>
        <FavoriteMenu />
            <Switch>
        <Route exact path="/favorite/like">
       <Favorite like products={userLikeProducts} deleteLike={deleteLike} deleteDisLike={deleteDisLike}/>
       </Route >
       <Route exact path="/favorite/dislike">
           <Favorite dislike products={userDisLikeProducts} deleteLike={deleteLike} deleteDisLike={deleteDisLike}/>
       </Route>
       </Switch>
       </>
    )
}

export default FavoriteContainer
