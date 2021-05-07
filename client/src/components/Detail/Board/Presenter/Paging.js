import React from 'react'


const Paging = ({CurrentPage,Pages,onChangePage}) => {

    return (
        <div style={{ margin:'1rem auto'}}>
            <ul className="Pages" style={{listStyle:'none', display:'flex',flexWrap:'wrap',justifyContent:'center'
                        ,padding:'0',marign:'auto 2rem',alignItems:'center'}}>
                {Pages && Pages.map((page,index)=>(
                    (CurrentPage!=page ? 
                    <li className="page_list" 
                    style={{margin:'0.2rem',padding:'0.5rem',fontSize:'0.6rem',border:'0.5px solid gray', borderRadius:'4px'}}
                    onClick={()=>onChangePage(page)}
                    key={index}
                    >
                    {page}
                    </li>
                    :
                    <li className="page_list"
                    style={{margin:'0.2rem',padding:'0.5rem',fontSize:'0.6rem',border:'0.5px solid gray', borderRadius:'4px',color:'red'}}
                    onClick={()=>onChangePage(page)}
                    key={index}
                    >
                     {page}   
                    </li>
                    )
                ))}
            </ul>
            
            
        </div>
    )
}

export default Paging
