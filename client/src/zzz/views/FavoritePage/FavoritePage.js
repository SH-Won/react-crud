import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {Card,Col,Row,Button} from 'antd';
import {getLike} from '../../../_actions/favorite_actions'
import ImageSlider from '../../util/ImageSlider'


const {Meta} = Card;

function FavoritePage() {
    const dispatch =useDispatch();
   
    const user = localStorage.getItem('userId');
    const favorited_products=useSelector(state=>state.favorite.favorited_products,[]);
    
    useEffect(()=>{
         let variable={
            userTo:user
            
        }
           console.log(user)
        dispatch(getLike(variable))

    },[])

   const renderCard = favorited_products.length >0 && 
   favorited_products.map((product,index)=>{
       //  const handleDelete =[<Button> </Button>]
      return <Col key={`${product.productId._id}+${index}`} lg={6} md={8} xs={24}>
          <Card
            hoverable={true}
            cover={<a href={`/product/${product.productId._id}`}><ImageSlider images={product.productId.images}/></a>}
            actions
            >
          <Meta
           title={product.productId.title}
           />

          </Card>

       </Col>
   })


    return (
        <div style={{width:'90%',margin:'2rem auto'}}>
            {favorited_products.length ===0 ? 
            <div style={{display:'flex',justifyContent:'center'}}> 좋아하는 게시글이 없습니다</div> : 
            <Row gutter={[16,16]}>
               {renderCard}
           
            </Row>
            }
         
           
            
        </div>
    )
}

export default FavoritePage
