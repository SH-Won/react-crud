import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {Button} from 'antd';


function ProductInfo(props) {
    const [Product,setProduct]=useState({})
    const user = {...props.detail.writer}

    useEffect(()=>{
        setProduct(props.info)

    },[props.detail])

   
    


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <td>제목</td>
                        <td>내용</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                  <td>{props.detail.title}</td>
                  <td>{props.detail.description}</td>
                  </tr>
                </tbody>
            </table>


            {props.writer===user._id &&
            <div style={{display:'flex',justifyContent:'center',margin:'3rem auto'}}>
               <Button><span><a href={`/product/edit/${props.detail._id}`}>수정</a></span></Button>

            </div>
}
        </div>
    )
}

export default ProductInfo
