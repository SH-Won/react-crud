import React,{useEffect,useState} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {getFirstProduct,getBoardProduct} from '../../../../_actions/product_actions';
import Board from '../Presenter/Board'

const BoardContainer = ({productId}) => {
    const dispatch = useDispatch();
    const [Pages,setPages]=useState([])
    const [CurrentPage,setCurrentPage]=useState(0);
    const [Skip,setSkip]=useState(0)
    const [Limit,setLimit]=useState(5)
    const [boardProduct,setboardProduct]=useState([]);

    useEffect(()=>{
        dispatch(getFirstProduct(0))

    },[])
    const products = useSelector(state=>state.product.products)
   
    /*const {products,board_products}=useSelector(state=>({
            products:state.upload.products,
            board_products:state.upload.boardProducts
    }),[])
    */

    useEffect(()=>{
        let products_length = products.length; // 41 이라면
        let page_length = Math.ceil(products_length/Limit) // 41/4 에서 올림
        let pages = Array.from({length:page_length},(v,i)=> i+1)
        
        //현재 아이템이 들어있는 페이지가 몇번째 페이지인가?
        let currentProductIndex = products.map(product => product._id.toString()).indexOf(productId)
        let pageIndex = Math.ceil((currentProductIndex+1)/Limit)
        setPages(pages)
        setCurrentPage(pageIndex)
        setSkip((pageIndex -1)*Limit )
        
      },[products])

     
      
      useEffect(()=>{
        
        const board = products.slice(Skip,Skip+Limit)
          setboardProduct(board)
      },[CurrentPage])
     
     


      const onChangePage =(page)=>{
        const skip = (page -1) * Limit
       
        setSkip(skip)
        setCurrentPage(page)
        
      }
    

    return (
        
            <Board
             CurrentPage={CurrentPage}
             Pages={Pages}
             board_products={boardProduct}
             onChangePage={onChangePage}
             />
        
    )
}

export default BoardContainer
