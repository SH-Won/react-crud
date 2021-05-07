import React from 'react'
import {Carousel} from 'antd';


const ImageSlider = ({images})=> {
    console.log(images);
    return (
        <div className='img_container' style={{width:'100%',margin:'0'}}>
            <Carousel autoplay>
                {images && images.map((image,index)=>(
                    <div key={index} style={{}}>
                        <img className='img'
                           src={image} alt="product Image"/>
                    </div>
                ))}
            </Carousel>
            
        </div>
        
    )
}

export default ImageSlider
