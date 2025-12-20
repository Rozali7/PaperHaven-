import React, { useEffect, useMemo, useState } from "react";
import "../styles/Books.css";

/**
 * Category rules:
 * - If your DB has book.category, it will be used automatically.
 * - If not, we fall back to a title-based map.
 */
const CATEGORY_BY_TITLE = {
  "Atomic Habits": "Self-Help",
  "The Subtle Art of Not Giving a F*ck": "Self-Help",
  Becoming: "Non-Fiction",
  Educated: "Non-Fiction",
  "The Great Gatsby": "Fiction",
  "The Book Thief": "Fiction",
  "The Alchemist": "Fiction",
  "The Midnight Library": "Fiction",
};

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Self-Help"];

export default function Books({ onAdd }) {
  const [books, setBooks] = useState([]);

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortMode, setSortMode] = useState("none"); // none | price-asc | price-desc

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.books)
          ? data.books
          : Array.isArray(data?.data)
          ? data.data
          : [];

        setBooks(list);
      })
      .catch(console.error);
  }, []);

  const getCategory = (book) => {
    const raw =
      (book?.category || book?.Category || book?.type || "").toString().trim();

    if (raw) {
      const v = raw.toLowerCase();
      if (v.includes("self")) return "Self-Help";
      if (v.includes("non")) return "Non-Fiction";
      if (v.includes("fiction")) return "Fiction";
    }

    const title = (book?.title || "").trim();
    return CATEGORY_BY_TITLE[title] || "Fiction";
  };

  // ✅ Always safe: books is an array
  const bundleBooks = books.slice(0, 3);

  const addBundleToCart = (e) => {
    e.stopPropagation();
    const bundleItem = {
      id: "holiday-bundle-3for25",
      title: "🎄 Holiday Bundle (3 Books)",
      price: 25,
      image: bundleBooks[0]?.image || "",
      isBundle: true,
    };
    onAdd(bundleItem);
  };

  // Optional “replace one book” logic you had
  const displayBooks = useMemo(() => {
    return books.map((book) => {
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
  }, [books]);

  // ✅ Filter + Search + Sort (WORKING)
  const filteredSortedBooks = useMemo(() => {
    const q = search.trim().toLowerCase();

    let arr = displayBooks.filter((b) => {
      const title = (b.title || "").toLowerCase();
      const author = (b.author || "").toLowerCase();
      const matchesSearch = !q || title.includes(q) || author.includes(q);

      const cat = getCategory(b);
      const matchesCategory = activeCategory === "All" || cat === activeCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortMode === "price-asc") {
      arr = [...arr].sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sortMode === "price-desc") {
      arr = [...arr].sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    return arr;
  }, [displayBooks, search, activeCategory, sortMode]);

  // ✅ Sections (same card size always)
  const newReleases = filteredSortedBooks.slice(0, 4);
  const bestSellers = filteredSortedBooks.slice(4, 8);

  const renderGrid = (list) => {
    if (!list.length) {
      return <div className="no-results">No books found.</div>;
    }

    return (
      <div className="books-grid">
        {list.map((book) => (
          <div key={book.id} className="shop-card">
            <div className="shop-img-wrap">
              <img
                src={book.image}
                alt={book.title}
                className="shop-img"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>

            <div className="shop-body">
              <h3 className="shop-title">{book.title}</h3>
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
    );
  };

  return (
    <div className="books-page">
      <h1 className="books-title">Our Book Collection</h1>
      <p className="books-subtitle">
        Discover stories that inspire, educate, and stay with you.
      </p>

      {/* ✅ Search (KEEP exactly) */}
      <input
        className="books-search"
        type="text"
        placeholder="Search by book name or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ✅ Filters + Sort */}
      <div className="books-options">
        <div className="category-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className={`filter-btn ${activeCategory === c ? "active" : ""}`}
              onClick={() => setActiveCategory(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>

        <div className="sort-wrap">
          <span className="sort-label">Sort:</span>
          <select
            className="sort-select"
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
          >
            <option value="none">None</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="price-asc">Price: Low → High</option>
          </select>
        </div>
      </div>

      {/* ✅ Bundle (KEEP) */}
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

      {/* ✅ If user is searching: show ONE grid (so results are consistent) */}
      {search.trim() ? (
        <>
          <h2 className="section-title">Search Results</h2>
          {renderGrid(filteredSortedBooks)}
        </>
      ) : (
        <>
          <h2 className="section-title">New Releases</h2>
          {renderGrid(newReleases)}

          <h2 className="section-title">Best Sellers</h2>
          {renderGrid(bestSellers)}
        </>
      )}
    </div>
  );
}















































