import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home({ user, onLogout }) {
  const navigate = useNavigate();

const bookImages = [
  // The Great Gatsby
  "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",

  // The Alchemist
  "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",

  // Atomic Habits
  "https://m.media-amazon.com/images/I/81wgcld4wxL._AC_UF1000,1000_QL80_.jpg",

  // Becoming (Michelle Obama)
  "https://m.media-amazon.com/images/I/81h2gWPTYJL._AC_UF1000,1000_QL80_.jpg",
];


  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Quiet Story</h1>
          <p>
            PaperHaven is a calm corner for readers—soft design, curated picks,
            and a gentle flow.
          </p>

          <div className="hero-actions">
            {user ? (
              <>
                {/* Welcome message when logged in */}
                <p className="hero-welcome">
                  Welcome, <strong>{user.name}</strong> 👋
                </p>

                {/* Explore books */}
                <button
                  className="btn primary-btn"
                  onClick={() => navigate("/books")}
                >
                  Explore Books
                </button>

                {/* Logout */}
                <button
                  className="btn ghost-btn"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* When not logged in: original buttons */}
                <button
                  className="btn primary-btn"
                  onClick={() => navigate("/books")}
                >
                  Explore Books
                </button>

                <div className="hero-auth-buttons">
                  <Link to="/login" className="btn ghost-btn">
                    Sign In
                  </Link>
                  <Link to="/register" className="btn ghost-btn">
                    Join
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ⭐ PROFESSIONAL BOOK SLIDER ⭐ */}
      <section className="book-slider-section">
        <h2 className="slider-title">Featured Book Picks</h2>

        <div className="book-slider">
          <div className="slider-track">
            {[...bookImages, ...bookImages].map((img, i) => (
              <div className="book-card" key={i}>
                <img src={img} alt="Book" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



















