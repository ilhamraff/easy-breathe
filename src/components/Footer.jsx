import React from "react";
import { FiFileText, FiGithub, FiInstagram, FiLinkedin } from "react-icons/fi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-left">
          <h2 className="footer-logo">Easy Breathe</h2>
          <p className="footer-desc">
            Bebaskan Diri Anda dari Kecanduan Merokok
          </p>
        </div>
        <div className="footer-center">
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="/home">Beranda</Link>
              </li>
              <li>
                <Link to="/articles">Artikel</Link>
              </li>
              <li>
                <Link to="/about">Tentang</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-right">
          <div className="social-media">
            <a
              href="https://www.linkedin.com/in/ilhamrafifadhilah/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin size={24} />
            </a>
            <a
              href="https://github.com/ilhamraff"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub size={24} />
            </a>
            <a
              href="https://www.instagram.com/ilhamraff_/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiInstagram size={24} />
            </a>
            <a
              href="https://ilhamrafi-portfolio.web.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiFileText size={24} />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 East Breathe. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
