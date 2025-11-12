import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ cartCount }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          <span className="brand-main">Paper</span>
          <span className="brand-sub">Haven</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/books" className={({ isActive }) => (isActive ? "active" : "")}>
            Books
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => (isActive ? "active cart-link" : "cart-link")}>
            🛒 <span>({cartCount})</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}








 



