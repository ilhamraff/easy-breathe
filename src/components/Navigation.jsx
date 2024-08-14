import React, { useState } from "react";
import { FiChevronDown, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navigation({ firstName, onLogout }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  return (
    <nav className="navigation-bar">
      <div className="navigation-brand">
        <h3>Easy Breathe</h3>
        <button className="menu-toggle" onClick={toggleOffCanvas}>
          {isOffCanvasOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      <ul className={`navigation-item ${isOffCanvasOpen ? "open" : ""}`}>
        <li>
          <Link to="/home">Beranda</Link>
        </li>
        <li className="dropdown">
          <span onClick={toggleDropDown}>
            Jelajahi <FiChevronDown />
          </span>
          {isDropDownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/addiction-test">Tes Kecanduan</Link>
              </li>
              <li>
                <Link to="/calculator-savings">Kalkulator</Link>
              </li>
              <li>
                <Link to="/forum">Forum Diskusi</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/articles">Artikel</Link>
        </li>
        <li>
          <Link to="/about">Tentang Website</Link>
        </li>
        <li className="navigation-user">
          <span>Hello, {firstName}</span>
          <button onClick={onLogout}>
            <FiLogOut />
          </button>
        </li>
      </ul>
      {/* <div className="navigation-user">
        <span>Hello, {firstName}</span>
        <button onClick={onLogout}>
          <FiLogOut />
        </button>
      </div> */}
    </nav>
  );
}

export default Navigation;
