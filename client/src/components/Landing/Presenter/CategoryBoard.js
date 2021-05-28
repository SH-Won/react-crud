import React,{useState,useEffect} from 'react'

const CategoryBoard = ({products,title}) => {
    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(4);
    const [pages,setPages]=useState([]);
    const [currentProducts,setCurrentProducts]=useState([]);
    const [currentPage,setCurrentPage]=useState(1);
    //posts 17개
    console.log(products);
    useEffect(()=>{
        
        let productLength = products.length;
        let pagesLength = Math.ceil(productLength / limit);
        let pages = Array(pagesLength).fill().map((v,i)=> Number(i+1));
        setPages([...pages]);
        let boardProducts = products.slice(0,limit);
        setCurrentProducts([...boardProducts]);

    },[products])

    const handlePage = (page)=>{
        let start = (page - 1) * limit;
        let finish = start + limit;
        let boardProducts = products.slice(start,finish);
        
        setCurrentProducts(pre => [...boardProducts]);
        setCurrentPage(page);
    }

    const renderBoard = ()=>(
        <div className="board-container">
            
        <ul className="board-product">
                {currentProducts && currentProducts.map((product,index)=>(
                    <li key={index}><a href={`/product/${product._id}`}>{product.title}</a></li>
                ))}
            </ul>
            <ul className="pages">
                {pages && pages.map(page => 
                    <li className={currentPage === page ? 'current':''} key={page} onClick={()=>handlePage(page)}>{page}</li>
                    )}
            </ul>
        </div>
    )
    const noItemRenderBoard = () =>(
        
        <div className="board-container">
           게시물이 없습니다.
        </div>
        
        
    )
    


    return (
        <div className="category-board">
            <span className="category-board-title">{title}</span>
            {products && products.length > 0 ? 
            renderBoard() :
            noItemRenderBoard()
            }
            
        </div>
    )
}

export default CategoryBoard
