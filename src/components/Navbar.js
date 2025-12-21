import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ cartCount, user, onLogout }) {
  // ✅ Admin check (only Rozali can see Admin Dashboard)
  const isAdmin = user?.email === "kaissrozali79@gmail.com";

  return (
    <header className="navbar">
      <div className="navbar-inner">
      
        {/* LOGO — always visible */}
        <Link to="/" className="navbar-logo" aria-label="Paper Haven Home">
          <svg
            className="navbar-logo-svg"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            {/* book cover */}
            <rect
              x="6"
              y="9"
              width="36"
              height="30"
              rx="10"
              className="logo-bg"
            />

            {/* left page */}
            <path
              d="M14 16c4-2 8-2 12 0v20c-4-2-8-2-12 0V16z"
              className="logo-page"
            />

            {/* right page */}
            <path
              d="M34 16c-4-2-8-2-12 0v20c4-2 8-2 12 0V16z"
              className="logo-page"
            />

            {/* spine */}
            <path d="M24 16v20" className="logo-spine" />

            {/* bookmark */}
            <path
              d="M29 14v11l-2-1-2 1V14"
              className="logo-bookmark"
            />
          </svg>

          <span className="logo-text">
            <span className="logo-main">Paper</span>
            <span className="logo-sub">Haven</span>
          </span>
        </Link>

        {/* MAIN NAV LINKS */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/books"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Books
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Contact
          </NavLink>

          {/* ✅ ADMIN DASHBOARD LINK (only if admin email) */}
          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        {/* RIGHT SIDE: CART + LOGOUT */}
        <div className="navbar-actions">
          <Link to="/cart" className="cart-pill" aria-label="Cart">
            <span className="cart-icon" aria-hidden="true">🛒</span>
            <span className="cart-count">({cartCount})</span>
          </Link>

        
        </div>
      </div>
    </header>
  );
}












 



