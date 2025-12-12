import React, { useEffect, useState } from "react";
import "../styles/Books.css";

export default function Books({ onAdd }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then(setBooks)
      .catch(console.error);
  }, []);

  // ✅ Holiday bundle: pick 3 books (first 3 from DB)
  const bundleBooks = books.slice(0, 3);

  const addBundleToCart = (e) => {
    e.stopPropagation();

    // ✅ Add as ONE bundle item (shows as bundle with price 25)
    const bundleItem = {
      id: "holiday-bundle-3for25",
      title: "🎄 Holiday Bundle (3 Books)",
      price: 25,
      image: bundleBooks[0]?.image || "",
      isBundle: true,
    };

    onAdd(bundleItem);
  };

  // ✅ FIX #1: Replace broken "The Midnight Library" card (client-side only)
  const displayBooks = books.map((book) => {
    if (book.title === "The Midnight Library") {
      return {
        ...book,
        title: "The Book Thief",
        author: "Markus Zusak",
        price: 10.99,
        image: "https://images-na.ssl-images-amazon.com/images/I/91JGwQlnu7L.jpg",
      };
    }
    return book;
  });

  return (
    <div className="books-page">
      <h1 className="books-title">Our Book Collection</h1>
      <p className="books-subtitle">
        Discover stories that inspire, educate, and stay with you.
      </p>

      {/* ✅ BUNDLE SECTION */}
      {bundleBooks.length === 3 && (
        <div className="bundle-card">
          <div className="bundle-left">
            <span className="bundle-tag">🎄 Holiday Bundle</span>
            <h2 className="bundle-title">3 Books for $25</h2>
            <p className="bundle-text">
              A cozy Christmas bundle for readers — perfect for gifting or
              treating yourself.
            </p>

            <div className="bundle-row">
              <div className="bundle-price">
                <span className="bundle-price-main">$25</span>
                <span className="bundle-note">Limited offer</span>
              </div>

              <button className="bundle-btn" onClick={addBundleToCart}>
                Add Bundle 🎁
              </button>
            </div>
          </div>

          <div className="bundle-right">
            <div className="bundle-covers">
              {bundleBooks.map((b) => (
                <img
                  key={b.id}
                  className="bundle-cover"
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <h2 className="section-title">Popular Book</h2>

      {/* ✅ BOOKS GRID (theme-style cards) */}
      <div className="books-grid">
        {displayBooks.map((book) => (
          <div key={book.id} className="shop-card">
            <div className="shop-img-wrap">
              <img
                src={book.image}
                alt={book.title}
                className="shop-img"
                loading="lazy"
                onError={(e) => {
                  // Keep layout if any image fails (don’t break the grid)
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="shop-body">
              <h3 className="shop-title">{book.title}</h3>

              {/* ✅ FIX #2: subtitle sizing handled in CSS */}
              <p className="shop-author">By {book.author}</p>

              <div className="shop-rating" aria-label="Rating">
                ★★★★★
              </div>

              <div className="shop-price">
                ${Number(book.price || 0).toFixed(2)}
              </div>

              <button className="shop-btn" onClick={() => onAdd(book)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}














































