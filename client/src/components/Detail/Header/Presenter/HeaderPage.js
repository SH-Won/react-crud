import React from "react";
import HeaderImage from "./HeaderImage";
import HeaderInfo from "./HeaderInfo";


const HeaderPage = ({ product,user,deleteProduct,selectedImage,selectImage,addToCart }) => {
  
  return (
        <div className="detail-header-container">
          <div className="detail-header">
          <h2>{product.title}</h2>
          <ul className="detail-header_info">
            <li>{product.writer && product.writer.name}</li>
            <li>{product.createdAt}</li>
          </ul>
          </div>
          <div className="detail-header_content">
          <HeaderImage images={product.images} selectedImage={selectedImage} selectImage={selectImage}/>
          <HeaderInfo product={product} user={user} deleteProduct={deleteProduct} addToCart={addToCart}/>
          </div>
        </div>
    
  );
};

export default HeaderPage;
