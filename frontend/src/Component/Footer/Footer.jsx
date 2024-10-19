import React from 'react';
import './Footer.css'; // Import the CSS file
import logo1 from "../../assets/logo1.png"
import logo2 from "../../assets/logo2.png"
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="footer footer-center footer-arrenge">
      <div className='logo-container'>
      <img src={logo1} alt=""  />
      <img src={logo2} alt="" />
      </div>
    <div>  
      <nav className="footer-nav">
        <ul className="quick-links">
          <li><a href="/about">About Us</a></li>
          <li><a href="/projects">Projects</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
        </ul>
      </nav>
      <div className="icon-container">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <FaTwitter className="social-icon" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="social-icon" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="social-icon" />
                    </a>
                </div>
      <div className="developer-names">
        <p>Developed by Ravi Singh, Rashi Vishnoi, Rashmi Mishra, Ryan Goal</p>
      </div>
      <aside>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved by Project Hub</p>
      </aside>
      </div>
    </footer>
  );
};

export default Footer;
