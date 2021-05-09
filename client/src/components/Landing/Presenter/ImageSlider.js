import React from 'react'
import {Carousel} from 'antd';


const ImageSlider = ({images,productId})=> {
    
    return (
        
            <Carousel  autoplay>
                {images && images.map((image,index)=>(
                <div key={index} className="landing-content_card-img-wrap">
                  <a href={`product/${productId}`}>
                  <img  className='landing-content_card-img'
                           src={image} alt="product Image"/>
                  </a>
                </div>
                ))}
            </Carousel>
        
            
        
        
    )
}

export default ImageSlider
