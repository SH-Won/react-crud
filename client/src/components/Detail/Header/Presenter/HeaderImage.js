import React from 'react'


const HeaderImage = (props) => {
    const {images,selectedImage,selectImage} =props;
   
    return (
        <div>
            
            <div>
                <div style={{display:'flex', flexDirection:'column',alignItems:'center'}}>
                    {selectedImage && 
                    <div className="selected_img">
                    <img src={`${selectedImage}`} />
                    </div>
                    }
                    <div className="select_img">
                    {images && images.map((image,index)=>(
                        <div className='img_container' key={index} >
                        <img className={selectedImage === image ? 'choosed_img':'choose_img'}  onClick={()=>selectImage(image)} src={`${image}`} />
                        </div>
                    ))}
                    </div>
                </div>
                
            </div>
            
        </div>
    )
}

export default HeaderImage
