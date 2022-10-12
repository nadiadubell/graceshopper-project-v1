import { Link } from "react-router-dom";
import "./Footer.css"
export const Footer = () => {
  return (
    <>
      <nav className="footer">
        <a href="https://www.linkedin.com/home" className="footer" target="_blank" rel="noreferrer">
          <img 
            src="https://www.freeiconspng.com/thumbs/linkedin-logo-png/linkedin-logo-3.png" width="50"
            alt="Linkedin Logo"
          /> 
        </a>

        <a href="https://www.facebook.com/" className="footer" target="_blank" rel="noreferrer">
          <img
            src="https://www.freeiconspng.com/uploads/facebook-logo-2.png" width="50"
            alt="Facebook Logo" 
          />
        </a>

        <h2 className="footer">&copy; 2022</h2>

        <a href="https://www.instagram.com/" className="footer" target="_blank" rel="noreferrer">
          <img
            src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-instagram-new-logo-vector-download-13.png" width="50"
            alt="Instagram Logo" 
          />
        </a>

        <a href="https://www.twitter.com/" className="footer" target="_blank" rel="noreferrer">
          <img 
            src="https://www.freeiconspng.com/uploads/twitter-icon-png-13-1.png" width="50"
            alt="Twitter Logo"
          />
        </a>    
      </nav>
    </>
  )
}


 