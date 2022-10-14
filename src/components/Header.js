import { Link } from 'react-router-dom';
import './Header.css';

export const Header = ({ isLoggedIn, isAdmin }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    props.setIsLoggedIn(false);
    navigate('/');
  };

  const linksListGuest = [ {name: Products, link: <Link to='products'/>}, {name: Orders, link: <Link to='orders'/>}, {name: Login, link: <Link to='login'/>}, {name: login, link: <Link to='/login'/>} ]
  const linksListUser = [ {name: Products, link: <Link to='products'/>}, {name: Orders, link: <Link to='orders'/>}, {name: Profile, link: <Link to='profile'/>}, {name: Logout, link: <Link to='/'/>} ]
  const linksListAdmin = [ {name: Admin, link: <Link to='admin'/>}, {name: Products, link: <Link to='products'/>}, {name: Orders, link: <Link to='orders'/>}, {name: Profile, link: <Link to='profile'/>}, {name: Logout, link: <Link to='/'/>} ]

  return (
    <div id="header">
      <Link to="profile">
        <img
          id="logo"
          src="https://www.freeiconspng.com/uploads/white-horse-png-23.png"
          width="50"
          alt="Horse Logo Image"
        />
      </Link>
      <h1 id="header" id="banner">
        Welcome to HorsePlay!
      </h1>

      {isLoggedIn ? (
        <>
          <nav id="header">
            {isAdmin ? (
              <Link id="links" to="admin">
                admin
              </Link>
            ) : null}
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
            <ul className="horse"/>
              {linksListUser.map((link, i) => {
                return (
                  <div key={i}>
                    <p {link.link}>{link.name}</p>
                  </div>
                )
              })}
            </ul>
          </nav>
        </>
      ) : (
        <>
          <nav id="header">
            <Link id="links" to="products">
              products
            </Link>
            <Link id="links" to="orders">
              cart
            </Link>
            <Link id="links" to="register">
              register
            </Link>
            <Link id="links" to="login">
              login
            </Link>
          </nav>
        </>
      )}
    </div>
  );
};
