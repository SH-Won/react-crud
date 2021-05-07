import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Paging from './Paging';
import axios from 'axios';
import {getFirstProduct} from '../../../../_actions/product_actions';
import {Button} from 'antd'
import './board.css';

function Board(props) {
  //  const productId = props.match.params.productId;
    const dispatch = useDispatch();
    const products =useSelector(state=>state.upload.products,[]);
    const [Skip,setSkip] = useState(0);
    const [Limit,setLimit]=useState(4);
    const [Products,setProducts]=useState([]);
    const [CurrentPage,setCurrentPage]=useState(0);
    
    
   // const [CurrentPage,setCurrentPage]=(1);
    useEffect(()=>{
        
      
        let variable={
            skip:0   
        }
        axios.post('/api/product/getFirstProducts',variable)
        .then(response=>{
            const productIndex = response.data.products.map(product=>product._id).indexOf(props.productId);
            const currentPage = Math.ceil((productIndex+1)/Limit)
            
           
            setProducts(response.data.products);
            setCurrentPage(currentPage);
            setSkip( (currentPage - 1 ) * Limit ) 
            dispatch(getFirstProduct((currentPage - 1 ) * Limit,Limit));
            
        })

        
    },[])

    console.log(Products)

    const handlePage = (page)=>{
        let skip = (page -1) * Limit
        let limit = Limit

        dispatch(getFirstProduct(skip,limit))

        setSkip(skip);
        setCurrentPage(page);


    }
    
    const Prev =(productId) =>{
        const currentIndex = Products.map(product=>product._id).indexOf(productId);
        const PrevIndex =currentIndex -1
        if(currentIndex == 0 ) return

     //   props.history.push(`/product/${Products[PrevIndex]._id}`)
    }
    const Next =(productId) =>{
       const currentIndex = Products.map(product=>product._id).indexOf(productId);
       const nextIndex = currentIndex +1
       if(currentIndex == Products.length -1 ) return

     //  props.history.push(`/product/${Products[nextIndex]._id}`)
   }
 
   

    return (
        <div style={{margin:'1rem auto'}}>
            <h3 style={{borderBottom:'1px solid gray'}}>게시글</h3>
            <ul style={{listStyle:'none',display:'flex',flexDirection:'column',padding:'16px',margin:'0',textDecoration:'none'}}>
                {products && products.map((product,index)=>(
                  product._id === props.productId ?
                 <li style={{padding:'8px',fontSize:'16px',borderBottom:'1px solid #e8e8e8'}} key={`${product._id}+${index}`} ><a style={{color:'blue'}} href={`/product/${product._id}`}>{product.title}</a></li>
                :<li style={{textDecoration:'none',padding:'8px',borderBottom:'1px solid #e8e8e8'}} key={`${product._id}+${index}`} ><a  href={`/product/${product._id}`}>{product.title}</a></li>
                ))}
            </ul>
    
            <Paging productId={props.productId} Products={Products} CurrentPage={CurrentPage}
            limit={Limit} skip={Skip} handlePage={handlePage} Prev={Prev} Next={Next}/>
            
            
        </div>
    )
}

export default Board
