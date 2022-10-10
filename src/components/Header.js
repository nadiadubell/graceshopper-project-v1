import { Link } from "react-router-dom";
const Header = ({ isLoggedIn }) => {

  return (
    <div>
      <h1><Link class="header-links" to="/">Horseplay</Link></h1>
      
      <div>
        <Link to="profile">
          <img 
            src="https://www.freeiconspng.com/uploads/white-horse-png-23.png" width="350" 
            alt="Horse Logo Image" 
          />
        </Link>
      </div>

      {isLoggedIn ? (
        <>
          <nav class="header-links">
            <Link to="profile">profile</Link>
            <Link to="products">products</Link>
            <Link to="cart">cart</Link>
            <Link to="contact">contact</Link>
          </nav>  
        </>
      ) : (
        <> 
          <nav class="header-links">
            <Link to="login">login</Link>
            <Link to="products">products</Link>
            <Link to="cart">cart</Link>
            <Link to="contact">contact</Link>
          </nav> 
        </>
      )}
    </div>
  );
}

export default Header;