import { Link } from 'react-router-dom';
import './Header.css'


export const Header = ({ isLoggedIn }) => {

  return (
    <div className='header'>
        <Link to="profile">
          <img 
            id="logo"
            src="https://www.freeiconspng.com/uploads/white-horse-png-23.png" width="50" 
            alt="Horse Logo Image" 
            
          />
        </Link>

      {isLoggedIn ? (
        <>
          <nav className="header">
            <Link id="links" to="profile">profile</Link>
            <Link id="links" to="products">products</Link>
            <Link id="links" to="cart">cart</Link>
            <Link id="links" to="contact">contact</Link>
          </nav>  
        </>
      ) : (
        <> 
          <nav>
            <Link id="links" to="login">login</Link>
            <Link id="links" to="products">products</Link>
            <Link id="links" to="cart">cart</Link>
            <Link id="links" to="contact">contact</Link>
          </nav> 
        </>
      )}
    </div>
  );
}
