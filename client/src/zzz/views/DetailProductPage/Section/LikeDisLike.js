import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {Tooltip,Icon} from 'antd';
import {getLikeInfo,
    getDisLikeInfo,
    upLike,
    downLike,
    upDisLike,
    downDisLike
} from '../../../../_actions/favorite_actions'
import axios from 'axios';




function LikeDisLike(props) {
    const productId = props.productId;
    const commentId = props.commentId;
    const dispatch = useDispatch();
    const favorite_Info =useSelector(state=>state.favorite,[state=>state.favorite]);
   // const disLikeInfo =useSelector(state=>state.favorite,[state=>state.favorite]);
    const [LikeNumber,setLikeNumber]=useState(0)
    const [DisLikeNumber,setDisLikeNumber]=useState(0);
    const [Liked,setLiked]=useState(null);
    const [DisLiked,setDisLiked]=useState(null);
    const userTo = localStorage.getItem('userId');

    let variable={};

    if(props.product){
        variable={
            productId:props.productId,
            userTo:props.userTo
        }
    }
    else{
        variable={
            commentId:props.commentId,
            userTo:props.userTo
        }
    }
   

    useEffect(()=>{
      /*  console.log(`변수 ${variable}`)
        dispatch(getLikeInfo(variable))
        .then(response=>{
            if(response.payload.success){
                setLikeNumber(favorite_Info.likes.length)
                favorite_Info.likes.map(like => {
                    if(like.userTo === props.userTo){
                        setLiked('Liked');
                    }
                })
            }
           
        })
        
        dispatch(getDisLikeInfo(variable))
        .then(response=>{
            if(response.payload.success){
                setDisLikeNumber(favorite_Info.disLikes.length)
                favorite_Info.disLikes.map(dislike=>{
                    if(dislike.userTo===props.userTo){
                        setDisLiked('DisLiked');
                    }
                })
           
        }
        })
       */
        axios.post('/api/likeDisLike/getLikeInfo',variable)
        .then(response=>{
            if(response.data.success){
                setLikeNumber(response.data.likes.length)
                response.data.likes.map(like=>{
                    if(like.userTo===props.userTo){
                        setLiked('Liked');
                    }
                })
            }
        })
        axios.post('/api/likeDisLike/getDisLikeInfo',variable)
        .then(response=>{
            if(response.data.success){
                setDisLikeNumber(response.data.disLikes.length)
                response.data.disLikes.map(disLike=>{
                    if(disLike.userTo===props.userTo){
                        setDisLiked('DisLiked');
                    }
                })
            }
        })
     
        
        
    },[])

    console.log(LikeNumber,DisLikeNumber);
        
       const handleLike =()=>{
           //만약에 라이크 버튼이 안눌러져있었다면
           if(Liked ===null){
               //라이크 버튼을 1 올려주고 
               //디스라이크 버튼이 눌러져있다면 
               //디스라이크 버튼을 1 줄여주고 상태를 false로 만든다.
              /* dispatch(upLike(variable))
               console.log('라이크 업',productId,commentId);
               setLiked('Liked')
               setLikeNumber(LikeNumber+1)
               if(DisLiked !==null){
                    setDisLiked(null)
                    setDisLikeNumber(DisLikeNumber-1)
                        
               }*/
               axios.post('/api/likeDisLike/upLike',variable)
               .then(response=>{
                   if(response.data.success){
                       setLiked('Liked');
                       setLikeNumber(LikeNumber+1)
                       if(DisLiked !== null){
                           setDisLiked(null)
                           setDisLikeNumber(DisLikeNumber-1)
                       }
                   }
               })
           }
           else{
              /*
               dispatch(downLike(variable))
               setLikeNumber(LikeNumber -1);
               setLiked(null)
               */
              axios.post('/api/likeDisLike/downLike',variable)
              .then(response=>{
                  if(response.data.success){
                      setLikeNumber(LikeNumber-1);
                      setLiked(null)
                  }
              })

           }
       }
       const handleDisLike =()=>{

        if(DisLiked ===null){
           /* dispatch(upDisLike(variable))
            setDisLiked('DisLiked')
            setDisLikeNumber(DisLikeNumber+1);

            if(Liked !==null){
                setLiked(null)
                setLikeNumber(LikeNumber-1)

            }
            */
           axios.post('/api/likeDisLike/upDisLike',variable)
           .then(response=>{
               if(response.data.success){
                   setDisLiked('DisLiked')
                   setDisLikeNumber(DisLikeNumber+1)
                   if(Liked !==null){
                       setLiked(null)
                       setLikeNumber(LikeNumber -1)
                   }
               }
           })
        }
        else{
            /*
            dispatch(downDisLike(variable))
            setDisLiked(null)
            setDisLikeNumber(DisLikeNumber-1)
            */
           axios.post('/api/likeDisLike/downDisLike',variable)
           .then(response=>{
               if(response.data.success){
                   setDisLikeNumber(DisLikeNumber-1)
                   setDisLiked(null);
               }
           })
        }

       }
    return (
        <div style={{display:'flex',justifyContent:'center',margin:'4px'}}>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={Liked ==='Liked' ? 'filled':'outlined'}
                          onClick={handleLike}
                          />
                </Tooltip>
                <span style={{paddingLeft:"8px",cursor:'auto'}}>{LikeNumber}</span>
            </span>

            <span style={{marginLeft:'12px'}} key="comment-basic-dislike">
                <Tooltip title="Disike">
                    <Icon type="dislike"
                          theme={DisLiked ==='DisLiked' ? 'filled':'outlined'}
                          onClick={handleDisLike}
                          />
                </Tooltip>
                <span style={{paddingLeft:"8px",cursor:'auto'}}>{DisLikeNumber}</span>
            </span>
            
        </div>
    )
}

export default LikeDisLike
