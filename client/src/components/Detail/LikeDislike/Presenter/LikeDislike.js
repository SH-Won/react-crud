import React from 'react'
import {Tooltip,Icon} from 'antd'

const LikeDislike = 
({
   
    LikeNumber,
    DisLikeNumber,
    Liked,
    DisLiked,
    onLike,
    onDisLike
}) => {
    return (
        <div style={{display:'flex',justifyContent:'center',margin:'4px'}}>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"
                          theme={Liked===true ? 'filled' : 'outlined'}
                          onClick={onLike}
                          />
                </Tooltip>
                <span style={{paddingLeft:"8px",cursor:'auto'}}>{LikeNumber}</span>
            </span>

            <span style={{marginLeft:'12px'}} key="comment-basic-dislike">
                <Tooltip title="Disike">
                    <Icon type="dislike"
                          theme={DisLiked===true ? 'filled':'outlined'}
                          onClick={onDisLike}
                          />
                </Tooltip>
                <span style={{paddingLeft:"8px",cursor:'auto'}}>{DisLikeNumber}</span>
            </span>
            
        </div>
    )
}

export default LikeDislike
