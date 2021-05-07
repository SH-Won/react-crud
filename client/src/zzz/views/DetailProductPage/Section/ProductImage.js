import React,{useState,useEffect} from 'react'
import ImageGallery from 'react-image-gallery';

function ProductImage(props) {
    const [Images,setImages]= useState([])

    useEffect(()=>{
        console.log(props.detail)
        if(props.detail.images ){
            console.log(props.detail)
            let images=[];
            props.detail.images && props.detail.images.map(item=>{
                images.push({
                    original:`http://localhost:5000/${item}`,
                    thumbnail:`http://localhost:5000/${item}`
                })
            })
            setImages(images);
        }

    },[props.detail])
    return (
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div >
            <ImageGallery items={Images}/>
            </div>
        </div>
    )
}

export default ProductImage
