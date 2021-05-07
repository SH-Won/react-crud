import React from 'react'
import Dropzone from 'react-dropzone';
import {Icon} from 'antd'

const EditImage = ({originalImages,onDrop,
    deleteOriginalImage,FileURL,deletePreview}) => {
   

    return (
        <div className='upload_container' >
             <Dropzone
               onDrop={onDrop}
               multiple={true}
               maxSize={8000000}
               >
                 {({getRootProps,getInputProps})=>(
                     <div className='input_img'
                     {...getRootProps()}>
                         <input {...getInputProps()}/>
                         <Icon type="plus" style={{fontSize:'3rem'}} />
                     </div>
                 )}  
               </Dropzone>
               <div className='total_img_container'>
                  {originalImages && originalImages.map((image,index)=>(
                       <div className='original_img_container'key={index} onClick={()=>deleteOriginalImage(image)} >
                       <img className='original_img' src={image} />
                       </div>
                  ))}
                  {FileURL && FileURL.map((image,index)=>(
                      <div className='new_img_container'key={index} onClick={()=>deletePreview(image)} >
                      <img className='new_img' src={image} />
                      </div>
                  ))}
               </div>
            
        </div>
        
    )
}

export default EditImage
