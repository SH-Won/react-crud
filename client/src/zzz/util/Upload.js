import React from 'react'
import Dropzone from 'react-dropzone';
import {useDispatch,useSelector} from 'react-redux';
import {uploadImage,deleteImages} from '../../_actions/product_actions'
import {Icon} from 'antd'
function Upload() {
    const dispatch = useDispatch();
    const images = useSelector(state=>state.upload.images);
    


    const onDrop =(files)=>{
        let formData = new FormData();
        let config = {header:{'content-type':'multipart/form-data'}}
        
        files.forEach(file=>{
            formData.append('file',file)
        })
        dispatch(uploadImage(formData,config))
    }

    const deleteImage = (image)=>{
        let imageArray =[...images]
        dispatch(deleteImages(image,imageArray))

    }
    
    

    return (
        <div style={{display:'flex',justifyContent:'space-between'}}>
             <Dropzone
               onDrop={onDrop}
               multiple={true}
               maxSize={8000000}
               >
                 {({getRootProps,getInputProps})=>(
                     <div style={{
                         width:'300px',height:'240px',border:'1px solid lightgray',
                         display:'flex', alignItems:'center',justifyContent:'center'
                     }}
                     {...getRootProps()}>
                         <input {...getInputProps()}/>
                         <Icon type="plus" style={{fontSize:'3rem'}} />
                     </div>
                 )}  
               </Dropzone>
               <div style={{display:'flex', width:'350px',height:'240px',overflowX:'scroll'}}>
                  {images && images.map((image,index)=>(
                      <div key={index} onClick={()=>deleteImage(image)} >
                      <img src={`http://localhost:5000/${image}`} style={{maxWidth:'300px' ,height:'200px', overflowX:'scroll'}}/>
                      </div>
                  ))}
               </div>
            
        </div>
        
    )
}

export default Upload
