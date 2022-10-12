import React from 'react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Header,
  Footer,
  Profile,
  Products,
  Register,
  Login,
} from './components';

import { getCurrentUser } from '../src/auth';
import { userCheck } from './api';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(getCurrentUser)
    
  const currentToken = localStorage.getItem('token');
  
  useEffect(() => {
        userCheck(currentToken);
  }, [isLoggedIn])


  return (
    <div>
      <Header
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      />
      <Routes>
        <Route exact path='/' element={<Products isLoggedIn={isLoggedIn}/>}></Route>
        <Route path='/products' element={<Products isLoggedIn={isLoggedIn}/>}></Route>
        <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn}/>}></Route>
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} />}></Route>
        <Route path='/register' element={<Register setIsLoggedIn={setIsLoggedIn} />}></Route>
        {/* <Route path='/products/:productId' element={<SingleProduct />}></Route> */}
        {/* <Route path='/order' element={<Order />}></Route> */}
        {/* <Route path='/checkout'element={<Checkout />}></Route> */}
        {/* <Route path="/:productId" element={<SingleProduct />}></Route> */}
        {/* <Route path='/order' element={<Order />}></Route>
            <Route path='/checkout'element={<Checkout />}></Route> */}
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
