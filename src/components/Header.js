import { Link } from 'react-router-dom';
import React from 'react';
import './Header.css';

export const Header = ({ isLoggedIn, isAdmin }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    props.setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="header">
      <Link to="products">
        <img
          id="logo"
          src="https://www.freeiconspng.com/uploads/white-horse-png-23.png"
          width="50"
          alt="Horse Logo Image"
        />
      </Link>
      <h1 className="header" id="banner">
        Welcome to HorsePlay!
      </h1>
      <h2 className="header" id="banner-two">
        Welcome to HorsePlay!
      </h2>
      {isLoggedIn ? (
        <>
          <nav id="nav-links">
            {isAdmin ? (
              <Link id="links" to="admin">
                admin
              </Link>
            ) : (
              <></>
            )}
            <Link id="links" to="products">
              products
            </Link>
            <Link id="links" to="orders">
              cart
            </Link>
            <Link id="links" to="profile">
              profile
            </Link>
            <Link id="links" to="/" onClick={handleLogout}>
              logout
            </Link>
          </nav>
          <nav id="nav-list-small">
            {isAdmin ? (
              <Link id="single-link" to="admin">
                admin
              </Link>
            ) : (
              <></>
            )}
            <Link id="single-link" to="products">
              products
            </Link>
            <Link id="single-link" to="orders">
              cart
            </Link>
            <Link id="single-link" to="profile">
              profile
            </Link>
            <Link id="single-link" to="/" onClick={handleLogout}>
              logout
            </Link>
          </nav>
          <nav id="nav-list-super-small">
            {isAdmin ? (
              <Link id="single-link" to="admin">
                admin
              </Link>
            ) : (
              <></>
            )}
            <Link id="single-link" to="products">
              products
            </Link>
            <Link id="single-link" to="orders">
              cart
            </Link>
            <Link id="single-link" to="profile">
              profile
            </Link>
            <Link id="single-link" to="/" onClick={handleLogout}>
              logout
            </Link>
          </nav>
        </>
      ) : (
        <>
          <nav className="header">
            <Link id="links" to="products">
              products
            </Link>
            <Link id="links" to="guestorders">
              cart
            </Link>
            <Link id="links" to="register">
              register
            </Link>
            <Link id="links" to="login">
              login
            </Link>
          </nav>
          <nav id="nav-list-small">
            <Link id="single-link" to="products">
              products
            </Link>
            <Link id="single-link" to="guestorders">
              cart
            </Link>
            <Link id="single-link" to="register">
              register
            </Link>
            <Link id="single-link" to="login">
              login
            </Link>
          </nav>
          <nav id="nav-list-super-small">
            <Link id="single-link" to="products">
              products
            </Link>
            <Link id="single-link" to="guestorders">
              cart
            </Link>
            <Link id="single-link" to="register">
              register
            </Link>
            <Link id="single-link" to="login">
              login
            </Link>
          </nav>
        </>
      )}
    </div>
  );
};
