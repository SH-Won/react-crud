import React from 'react'


const HeaderImage = (props) => {
    const {images,selectedImage,selectImage} =props;
   
    return (
        <div className="detail-header_img-container">
                   
                    {selectedImage && 
                    <div className="selected-img-container">
                    <img className="selected-img" src={`${selectedImage}`} />
                    </div>
                    }
                    <div className="choose-img-wrap">
                    {images && images.map((image,index)=>(
                        
                        <img key={index} className={selectedImage === image ? 'choosed-img':'choose-img'}  onClick={()=>selectImage(image)} src={`${image}`} />
                        
                    ))}
                    </div>
                
                
            
        </div>
    )
}

export default HeaderImage
