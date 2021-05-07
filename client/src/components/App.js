import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product

import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';


import UploadContainer from './Upload/UploadContainer'
import LandingContainer from './Landing/Container/LandingContainer'
import DetailContainer from './Detail/DetailContainer';
import EditContainer from './Edit/Container/EditContainer';
import FavoriteContainer from './Favorite/Container/FavoriteContainer'
import Puzzle from './Puzzle/Puzzle';
import CartPage from './Cart/CartPage';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
          <Switch>
          <Route exact path="/" component={Auth(LandingContainer, null)} />
          <Route exact path="/user" component={Auth(LandingContainer, null)} />

          
          
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/upload" component={Auth(UploadContainer, true)} />
          <Route exact path="/product/:productId" component={Auth(DetailContainer,null)} />
          <Route exact path="/product/edit/:productId" component={Auth(EditContainer,true)} />

          <Route exact path="/favorite/like" component={Auth(FavoriteContainer,true)}/>
          <Route exact path="/favorite/dislike" component={Auth(FavoriteContainer,true)}/>
         
          <Route exact path="/user/cart" component={Auth(CartPage,true)} />
        
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
