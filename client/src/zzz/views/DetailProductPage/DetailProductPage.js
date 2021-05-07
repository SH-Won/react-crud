import React,{useState,useEffect} from 'react'
import ProductInfo from './Section/ProductInfo'
import ProductImage from './Section/ProductImage';
import {Row,Col,Card} from 'antd';
import {useSelector,useDispatch} from 'react-redux';
import {getProductDetail} from '../../../_actions/product_actions';
import {getComments} from '../../../_actions/comment_actions';
import LikeDisLike from './Section/LikeDisLike';
import Comments from './Section/Comment/Comments';
import Board from './Section/Board';
import ImageSlider from '../../util/ImageSlider';
import {recentlyView} from '../../../_actions/user_actions'; 

import RecentlyView from './Section/RecentlyView'

function DetailProductPage(props) {

    const productId = props.match.params.productId
    const product = useSelector(state=>state.upload.product,[state=>state.upload.product]);
    const comments = useSelector(state=>state.comment.comments,[state=>state.comment.comments])
    const recentProduct = useSelector(state=>state.user.views);
    //views.product
    const userTo = localStorage.getItem('userId');
    const dispatch = useDispatch();
    useEffect(()=>{

        dispatch(getProductDetail(productId));

        
        let variable={
            productId:productId
        }
        dispatch(getComments(variable))

        let variables={
            product:productId,
            userTo:userTo
        }
        
        dispatch(recentlyView(variables))
        
        

    },[])
   /* const renderRecentCard = recentProduct.length>0 && 
        recentProduct.map(product =>(
            <Card key={product.product._id} 
            hoverable={true}
            style={{width:'33%'}}
            cover={ <ImageSlider  images={product.product.images} />}
            title={product.product.title}
            />
        ))
        */
        
       const renderRecentCard = recentProduct.length>0 && 
        recentProduct.map(product =>(
            <div key={product.product._id} style={{width:'40%',margin:'1rem 0.5rem',textAlign:'center',flexDirection:'column'}}>
            <ImageSlider  images={product.product.images} />
            <span style={{marginLeft:'1rem',padding:'0'}}>{product.product.title}</span>
            </div>
        ))
       

   
    
    return (

        <div style={{width:'85%',margin:'1rem auto'}}>
            <div style={{display:'flex',justifyContent:'center'}}>
                <h2>{product.title}</h2>
            </div>
            <br/><br/>
            
           
                
           <Row gutter={[16,16]}>
               <Col lg={12} xs={24}>
                  <ProductImage detail={product}/>
               </Col>
               <Col lg={12} xs={24}>
                  <ProductInfo detail={product} writer={userTo}/>
                  
                 
               </Col>
           </Row>

           
           <Row guttuer={[16,16]}>
               <Col lg={12} xs={24}>
               <Board productId={productId} />
               </Col>
               <Col lg={12} xs={24}>
               <h2>최근 본 게시글</h2>
                  <div style={{display:'flex',flexWrap:'nowrap',overflow:'auto',border:'1px solid gray',margin:'1rem 1rem',alignItems:'center'}}>
                   {renderRecentCard}
                   </div>
                   </Col>
           </Row>
           <Row gutter={[16,16]}>
           
           <Col xs={24} >
          
              
               <div style={{alignItems:'center'}}>
               <LikeDisLike product productId={productId} userTo={userTo}/> 
               <Comments  commentList={comments} productId={productId}/>
               </div>
               </Col>

           </Row>
           <div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
          
          </div>
          


            
        </div>
    )
}

export default DetailProductPage
