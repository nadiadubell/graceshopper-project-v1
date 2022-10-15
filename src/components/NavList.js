import { Link } from "react-router-dom";
import './NavList.css';


export const NavList = ({isLoggedIn}) => {

  const navListGuest = [ <Link to='products'>Products</Link>, <Link to='orders'>Orders</Link>, <Link to='login'>Login</Link>, <Link to='register'>Register</Link> ]
  const navListUser = [ <Link to='products'>Products</Link>, <Link to='orders'>Orders</Link>, <Link to='profile'>Profile</Link>, <Link to='/'>Logout</Link> ]
  // const navListAdmin = [ <Link to='admin'>Admin</Link>, <Link to='products'>Products</Link>, <Link to='orders'>Orders</Link>, <Link to='profile'>Profile</Link>, <Link to='/'>Logout</Link> ]

  const navListUserDiv = document.getElementById("horse");


  const handleClick = () => {
    if(navListUserDiv.style.display !== "none") {
      navListUserDiv.style.display == "none";
    } else {
      navListUserDiv.style.display == "display";
    }
  }

  return (
    <div id="nav-list-container">
    { isLoggedIn 
    ?
    (
    <div id="horse-container">
      <button id="horse-button" onClick={() => {handleClick}}>
        <img id="nav-icon" src="/nav-icon.png" width="20" heigh="20" alt="hamburger-pic"/>
      </button>
    <div id="horse">
      <ul id="horse-nav-list">
      {navListUser.map((link, i) => {
        return (
          <div key={i}>
            <li>{link}</li>
          </div>
                )
        })}
      </ul>
    </div>
    </div>
    )
    :
    <div id="horse-container">
    <button id="horse-button" onClick={() => {handleClick}}>
      <img id="nav-icon" src="/nav-icon.png" width="20" heigh="20" alt="hamburger-pic"/>
    </button>
  <div id="horse">
    <ul id="horse-nav-list">
    {navListGuest.map((link, i) => {
      return (
        <div key={i}>
          <li>{link}</li>
        </div>
              )
      })}
    </ul>
  </div>
  </div>
    }
    </div>
  );
};