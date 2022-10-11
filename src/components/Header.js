import { Link } from 'react-router-dom';
import './Header.css'


export const Header = ({ isLoggedIn }) => {

  return (
    <div>
      <div>
        <Link to="profile">
          <img 
            className="header"
            src="https://www.freeiconspng.com/uploads/white-horse-png-23.png" width="50" 
            alt="Horse Logo Image" 
            
          />
        </Link>
      </div>

      {isLoggedIn ? (
        <>
          <nav>
            <Link className="header" to="profile">profile</Link>
            <Link className="header" to="products">products</Link>
            <Link className="header" to="cart">cart</Link>
            <Link className="header" to="contact">contact</Link>
          </nav>  
        </>
      ) : (
        <> 
          <nav>
            <Link className="header" to="login">login</Link>
            <Link className="header" to="products">products</Link>
            <Link className="header" to="cart">cart</Link>
            <Link className="header" to="contact">contact</Link>
          </nav> 
        </>
      )}
    </div>
  );
}
