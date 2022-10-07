import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(localStorage.getItem("token")) {
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
      <div>
        {isLoggedIn ? (
          <Routes>
            <Route path='/' element={<h1>Welcome to HorsePlay!</h1>}></Route>
            <Route path='/products' element={<Products />}></Route>
            <Route path='/:productId' element={<SingleProduct />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/order' element={<Order />}></Route>
            <Route path='/checkout'element={<Checkout />}></Route>
            <Route path='/' element={<Footer />}></Route>
          </Routes>
        ) : (
          <div>
            <Routes>
              <Route path='/' element={<h1>Welcome to HorsePlay!</h1>}></Route>
              <Route path='/products' element={<Products />}></Route>
              <Route path='/:productId' element={<SingleProduct />}></Route>
              <Route path='/login' element={<Login />}></Route>
              <Route path='/register' element={<Register />}></Route>
              <Route path='/order' element={<Order />}></Route>
              <Route path='/checkout'element={<Checkout />}></Route>
            </Routes>

            {/* <Route path='/admin' element={<Admin />}></Route> */}

            <Route path='/' element={<Footer />}></Route>
          </div>
        )}
        </div>
    </div>  
  )
};

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);