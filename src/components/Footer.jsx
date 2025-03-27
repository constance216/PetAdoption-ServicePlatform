import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // Import icons
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/pets">Pets</a></li>
            <li><a href="/adopters">Adopters</a></li>
            <li><a href="/adopted">Adopted</a></li>
            <li><a href="/vets">Vets</a></li>
            <li><a href="/accounts">Accounts</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@petadoption.com</p>
          <p>Phone: +1 (123) 456-7890</p>
          <p>Address: 123 Pet Street, Pet City, USA</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-icons">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1877F2" }} // Facebook color
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1DA1F2" }} // Twitter color
              >
                <FaTwitter size={24} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#E4405F" }} // Instagram color
              >
                <FaInstagram size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Pet Adoption Service. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;