import React from 'react'
import {Button,Row,Col,Card} from 'antd'
import ImageSlider from './ImageSlider'
const {Meta}=Card;


const LaindingPage = ({products,postSize,loadMoreItems,Limit}) => {
    {/*
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
    */}
         
    return (
        <div className="landing-content-container" >
        
      {products.length ===0 ? 
      <div>게시글을 불러오는 중입니다</div> : 
      <section className="landing-content-wrap">
      {products.map((product,index)=>(
        <div key={`${product._id}+${index}`} className="landing-content_card" >
         
        <ImageSlider images={product.images} productId={product._id}/>
        
        <ul className="landing-content_card-information">
            <li className="information-item">{product.title}</li>
            <li className="information-item">작성자 : {product.writer.name}</li>
            
        </ul> 
    </div>
      ))}
      </section>
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
