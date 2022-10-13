import React from 'react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Header,
  Footer,
  Profile,
  Products,
  Orders,
  SingleProduct,
  Register,
  Login,
} from './components';
import { getCurrentUser } from '../src/auth';
import { userCheck } from './api';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getCurrentUser);
  const [productId, setProductId] = useState('');

  const currentToken = localStorage.getItem('token');

  useEffect(() => {
    userCheck(currentToken);
  }, [isLoggedIn]);

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Products isLoggedIn={isLoggedIn} setProductId={setProductId} />
          }
        ></Route>
        <Route
          path="/products"
          element={
            <Products isLoggedIn={isLoggedIn} setProductId={setProductId} />
          }
        ></Route>
        <Route
          path="/profile"
          element={<Profile isLoggedIn={isLoggedIn} setProductId={setProductId}/>}
        ></Route>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        ></Route>
        <Route path="/orders" element={<Orders />}></Route>
        {/* <Route path='/checkout'element={<Checkout />}></Route> */}
        <Route
          path="/:productId"
          element={<SingleProduct productId={productId} />}
        ></Route>
        {/* <Route path='/admin' element={<Admin />}></Route> */}
      </Routes>
      <Footer />
    </div>
  );
};

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
