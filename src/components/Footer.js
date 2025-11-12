import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <h2 className="footer-logo">
            <span className="brand-main">Paper</span>
            <span className="brand-sub">Haven</span>
          </h2>
          <p className="footer-text">
            A peaceful corner for readers. Discover stories that move, inspire, and stay with you.
          </p>
        </div>

        {/* Explore Section */}
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/books">Books</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="footer-links">
          <h4>Support</h4>
          <ul>
            <li>
              <a
                href="mailto:support@paperhaven.com"
                target="_blank"
                rel="noreferrer"
              >
                Email Us
              </a>
            </li>
            <li>
              <button
                className="footer-btn"
                onClick={() => alert("Help Center coming soon!")}
              >
                Help Center
              </button>
            </li>
            <li>
              <a
                href="https://paperhaven.com/faq"
                target="_blank"
                rel="noreferrer"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PaperHaven. All Rights Reserved.</p>
      </div>
    </footer>
  );
}




