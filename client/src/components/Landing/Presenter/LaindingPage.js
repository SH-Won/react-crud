import React from 'react'
import {Button,Row,Col,Card} from 'antd'
import ImageSlider from './ImageSlider'
const {Meta}=Card;


const LaindingPage = ({writer,removeProduct,products,postSize,loadMoreItems,Limit}) => {
    const renderCard = 
    products.length >0 && products.map((product,index)=>{
        const removeButton = writer === product.writer._id ? 
        [<Button onClick={()=>removeProduct(product._id)}>삭제</Button>] : ''
        return <Col key={`${product._id}+${index}`} lg={6} md={6} xs={12}>
             <Card
               hoverable={true}
               cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
               actions={removeButton}>
              <Meta 
                
                style={{fontSize:'0.5rem'}}
                title={product.title}
                description={`${product.writer.name}  ${product.category}  조회수 : ${product.views}` }
                />
             </Card>
            </Col>
        })
        

        const mouseOver = (description) =>{
            
              return  <div style={{width:'100px'}}>
                 {description}
                </div>
            
        }
         
    return (
        <div style={{width:'90vw' ,margin:'1rem auto',justifyContent:'center'}}>
        
        
        <div style={{display:'flex',justifyContent:'flex-end',margin:'1rem auto'}}>
       
        </div>
        
       {/* {products.length ===0 ? 
       <div>게시글을 불러오는 중입니다</div> :
        <Row gutter={[16,16]}> 
            {renderCard}   
        </Row>
        }
    */}
      {products.length ===0 ? 
      <div>게시글을 불러오는 중입니다</div> : 
      <div className="product_container">
      {products.map((product,index)=>(
        <div key={`${product._id}+${index}`} className="product_card" >
        <a href={`product/${product._id}`}><ImageSlider images={product.images}/></a>
        <ul className="product_explain">
            <li className="explain_item">{product.title}</li>
            <li className="explain_item">작성자 : {product.writer.name}</li>
            <li className="explain_item">분류 {product.category}</li>
            <li className="explain_item">{product.createdAt}</li>
        </ul> 
    </div>
      ))}
      </div>
  }
        
        <br/><br/>
        <div style={{display:'flex',justifyContent:'center'}}>
        {postSize >= Limit &&
        <Button onClick={loadMoreItems}> 게시글 더보기 </Button>            
        }
        </div>

    </div>
    )
}

export default LaindingPage
