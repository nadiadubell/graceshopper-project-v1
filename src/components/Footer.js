import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <h2>&copy 2022</h2>
    
      <nav className="footer-links">
        <a href="https://www.linkedin.com/home" target="_blank" rel="noreferrer">
          <img 
            src="https://www.freeiconspng.com/thumbs/linkedin-logo-png/linkedin-logo-3.png" width="50"
            alt="Linkedin Logo"
          /> 
        </a>

        <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <img
            src="https://www.freeiconspng.com/uploads/facebook-logo-2.png" width="50"
            alt="Facebook Logo" 
          />
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
          <img
            src="https://www.freeiconspng.com/uploads/new-instagram-icon-2.jpg" width="50"
            alt="Instagram Logo" 
          />
        </a>

        <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
          <img 
            src="https://www.freeiconspng.com/uploads/twitter-icon-png-13-1.png" width="50"
            alt="Twitter Logo"
          />
        </a>    
      </nav>
    </>
  )
}


 