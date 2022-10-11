import React from 'react';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer, Profile, Orders, Register, Login } from './components';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <Routes>
        <Route path="/" element={<h1>Welcome to HorsePlay!</h1>}></Route>
        {/* <Route path='/products' element={<Products />}></Route>
            <Route path='/products/:productId' element={<SingleProduct />}></Route> */}
        <Route path="/profile" element={<Profile />}></Route>
        {/* <Route path='/order' element={<Order />}></Route> */}
        {/* <Route path='/checkout'element={<Checkout />}></Route> */}
        {/* <Route path='/:productId' element={<SingleProduct />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/orders" element={<Orders />}></Route>
        {/* <Route path='/checkout'element={<Checkout />}></Route> */}
      </Routes>
      {/* <Route path='/admin' element={<Admin />}></Route> */}
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
