import React, { useState } from "react";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";

function Navigation({ firstName, onLogout }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  return (
    <nav className="navigation-bar">
      <div className="navigation-brand">
        <h3>Easy Breathe</h3>
      </div>
      <ul className="navigation-item">
        <li>
          <Link to="/home">Beranda</Link>
        </li>
        <li className="dropdown">
          <span onClick={toggleDropDown}>
            Tes & Kalkulator <FiChevronDown />
          </span>
          {isDropDownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/addiction-test">Tes Kecanduan</Link>
              </li>
              <li>
                <Link to="/calculator-savings">Kalkulator</Link>
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
      </ul>
      <div className="navigation-user">
        <span>Hello, {firstName}</span>
        <button onClick={onLogout}>
          <FiLogOut />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
