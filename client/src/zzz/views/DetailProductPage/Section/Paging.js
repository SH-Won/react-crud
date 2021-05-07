import React,{useState,useEffect} from 'react'
import {Button} from 'antd';
import axios from 'axios';
import './board.css';




function Paging(props) {

    const [Pages,setPages]=useState([]);
    
    const productId = props.productId;

    useEffect(()=>{
     /*  let variable={
            skip:0   
        }
        axios.post('/api/product/getFirstProducts',variable)
        .then(response=>{
            const page_length = response.data.products.length;
            const pageNumber = Math.ceil(page_length/props.limit);
            const pageArray = Array.from({length:pageNumber},(v,i)=>i+1);
            setPages(pageArray);
            setProducts(response.data.products)

        })*/
        if(props.Products.length >0 ){
            let page_length = props.Products.length;
            let pageNumber = Math.ceil(page_length/props.limit);
            let pageArray = Array.from({length:pageNumber},(v,i)=>i+1);
            setPages(pageArray);
        }
        
        
    },[props.Products])
       console.log(Pages)
       console.log(props.CurrentPage)
    
    
    return (
        <div>
            <ul style={{listStyle:'none',display:'flex',justifyContent:'space-between',padding:'0',margin:'3rem 6rem',fontSize:'12px'}}>
             {Pages && Pages.map((page,index)=>(
                 props.CurrentPage == Number(page) ? 
                <li className='paging' style={{padding:'4px',color:'red'}} key={index} onClick={()=>props.handlePage(page)}>{page}</li>
              : <li className='paging' style={{padding:'4px'}} key={index} onClick={()=>props.handlePage(page)}>{page}</li>
             ))}
            </ul>
          
            
        </div>
    )
}

export default Paging
