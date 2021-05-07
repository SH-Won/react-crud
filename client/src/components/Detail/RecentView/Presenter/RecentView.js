import React from 'react'
import {Collapse} from 'antd';

const {Panel} = Collapse

const RecentView = ({userRecentView}) => {
    const renderRecentView = () =>
        userRecentView && userRecentView.map((view,index)=>(
            <div className="card_container" key={`${view._id}+${index}`}>
            <a href={`/product/${view._id}`}><img src={`${view.images[0]}`}/></a>
            <span >{view.title}</span>
            </div>
        ))
    
    
    return (
        <div style={{width:'80%',margin:'2rem auto'}}>
            <Collapse accordion={true} bordered>
             <Panel header="최근 본 게시물" key="1">
                 <div className="recentview_container">
                   {renderRecentView()}
                 </div>

             </Panel>
            </Collapse>
        
        </div>
    )
}

export default RecentView
