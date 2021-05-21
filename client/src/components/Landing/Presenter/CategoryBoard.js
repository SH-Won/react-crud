import React,{useState,useEffect} from 'react'

const CategoryBoard = ({products}) => {
    const [skip,setSkip]=useState(0);
    const [limit,setLimit]=useState(4);
    const [pages,setPages]=useState([]);
    const [currentProducts,setCurrentProducts]=useState([]);
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

    }


    return (
        <div className="category-board">
            <ul className="board-product">
                {currentProducts && currentProducts.map((post,index)=>(
                    <li key={index}>{post.title}</li>
                ))}
            </ul>
            <ul className="pages">
                {pages && pages.map(page => 
                    <li key={page} onClick={()=>handlePage(page)}>{page}</li>
                    )}
            </ul>
            
        </div>
    )
}

export default CategoryBoard
