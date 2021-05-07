import React from 'react'
import {Carousel} from 'antd';

function ImageSlider(props) {
    //<img src={`http://localhost:5000/${image}`}
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image,index)=>(
                    <div key={index} style={{width:'50%',height:'auto'}}>
                        <img style={{ width:'100%',height:'320px'}}
                           src={`http://192.168.0.92:5000/${image}`} alt="product Image"/>
                    </div>
                ))}
            </Carousel>
            
        </div>
    )
}

export default ImageSlider
