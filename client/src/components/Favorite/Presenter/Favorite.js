import React from 'react'
import ImageSlider from '../../Landing/Presenter/ImageSlider'
import {Card,Col,Row,Button} from 'antd';
//좋아요 부분의 레이아웃을 다듬어라 ~~
const {Meta} = Card;
const Favorite = ({products,deleteLike,deleteDisLike,like,dislike}) => {
    const renderCard = 
    products.length >0 && products.map((product,index)=>{
        const deleteButton = like ? 
        [<Button onClick={()=>deleteLike(product._id)}>좋아요 삭제</Button>] :
        [<Button onClick={()=>deleteDisLike(product._id)}>싫어요 삭제</Button>]
        return <Col key={`${product._id}+${index}`} lg={6} md={8} xs={12}>
             <Card
               hoverable={true}
               cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/></a>}
               actions={deleteButton}>
              <Meta 
                title={product.title}
                description={`${product.writer.name}  ${product.category}  조회수 : ${product.views}` }
                />
             </Card>
            </Col>
        })
    return (
        <div style={{width:'90%' ,margin:'2rem auto'}}>
        
        <br/><br/>
        <div style={{display:'flex',justifyContent:'flex-end',margin:'1rem auto'}}>
       
        </div>
        <br/><br/>
       {products.length ===0 ? 
       <div>게시글을 불러오는 중입니다</div> :
        <Row gutter={[16,16]}> 
            {renderCard}   
        </Row>
        }
        <br/><br/>
        <div style={{display:'flex',justifyContent:'center'}}>
       
        
        </div>

    </div>
    )

}
/*
{postSize >= Limit &&
    <Button onClick={loadMoreItems}> 게시글 더보기 </Button>            
    }
*/

export default Favorite
