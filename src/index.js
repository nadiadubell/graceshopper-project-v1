import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  const BASE_URL = "http://localhost:3000/api"
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
            <Route path='/products' element={<Products BASE_URL={BASE_URL} />}></Route>
            <Route path='/products/:productId' element={<SingleProduct BASE_URL={BASE_URL} />}></Route>
            <Route path='/profile' element={<Profile BASE_URL={BASE_URL} />}></Route>
            <Route path='/order' element={<Order BASE_URL={BASE_URL} />}></Route>
            <Route path='/checkout'element={<Checkout BASE_URL={BASE_URL} />}></Route>
            <Route path='/' element={<Footer BASE_URL={BASE_URL} />}></Route>
          </Routes>
        ) : (
          <div>
            <Routes>
              <Route exact path='/' element={<h1>Welcome to HorsePlay!</h1>}> </Route>
              <Route path='/products' element={<Products />}></Route>
              <Route path='/:productId' element={<SingleProduct />}></Route>
              <Route path='users/login' element={<Login />}></Route>
              <Route path='users/register' element={<Register />}></Route>
              <Route path='users/order' element={<Order />}></Route>
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