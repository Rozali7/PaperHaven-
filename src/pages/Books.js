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

export default function Books({ onAdd }) { // add the book to cart on add called by the parent
  const [books, setBooks] = useState([]); // hold and update the books

  const [search, setSearch] = useState(""); // update the search
  const [activeCategory, setActiveCategory] = useState("All"); // control which category is chosen
  const [sortMode, setSortMode] = useState("none"); // none | price-asc | price-desc

  useEffect(() => {
    fetch("https://paperhaven-production-773e.up.railway.app/api/books")// sends a GET request to get the books from backend
      .then((res) => res.json()) // convert response to JavaScript object/array
      .then((data) => { // data contains the books that come from database
        const list = Array.isArray(data)
          ? data // if data is already an array use it
          : Array.isArray(data?.books)
          ? data.books // if data.books exists use that
          : Array.isArray(data?.data) // if data.data exists use that
          ? data.data // this prevents runtime errors that would crash the project
          : [];

        setBooks(list); // store the books in state to display
      })
      .catch(console.error); // catch any error that would occur
  }, []); // run once when page loads

  const getCategory = (book) => { // this function determines the category of each book
    const raw = // reads the category from the book object, even if backend uses different field names
      (book?.category || book?.Category || book?.type || "").toString().trim();

    if (raw) { // run only if category exists
      const v = raw.toLowerCase(); // safe comparison
      if (v.includes("self")) return "Self-Help"; // "self" means self-help
      if (v.includes("non")) return "Non-Fiction"; // "non" means non-fiction
      if (v.includes("fiction")) return "Fiction"; // fiction
    }

    const title = (book?.title || "").trim();
    return CATEGORY_BY_TITLE[title] || "Fiction"; // if category doesn’t exist, decide by title map
  }; // fiction is the default value

  // ✅ Always safe: books is an array
  const bundleBooks = books.slice(0, 3); // first three books for the bundle

  const addBundleToCart = (e) => {
    e.stopPropagation(); // prevent affecting other clicks, only add the bundle
    const bundleItem = {
      id: "holiday-bundle-3for25",
      title: "🎄 Holiday Bundle (3 Books)",
      price: 25,
      image: bundleBooks[0]?.image || "",
      isBundle: true,
    };
    onAdd(bundleItem); // add bundle to cart
  };

  const filteredSortedBooks = useMemo(() => {
    const q = search.trim().toLowerCase(); // normalized search text (lowercase, no spaces)

    let arr = books.filter((b) => { //  filter directly from books
      const title = (b.title || "").toLowerCase();
      const author = (b.author || "").toLowerCase();

      // matches search if search box is empty OR book title/author includes search text
      const matchesSearch = !q || title.includes(q) || author.includes(q);

      const cat = getCategory(b); // decide this book category
      const matchesCategory = activeCategory === "All" || cat === activeCategory; // match chosen category

      return matchesSearch && matchesCategory; // only keep books that match both
    });

    // Sort logic
    if (sortMode === "price-asc") {
      arr = [...arr].sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    } else if (sortMode === "price-desc") {
      arr = [...arr].sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    return arr; // final list after search + filter + sort
  }, [books, search, activeCategory, sortMode]); // ✅ updated dependencies

  // ✅ Sections (same card size always)
  const newReleases = filteredSortedBooks.slice(0, 4); // first 4 books
  const bestSellers = filteredSortedBooks.slice(4, 8); // next 4 books

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

      <input
        className="books-search"
        type="text"
        placeholder="Search by book name or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)} // change the search value accordingly
      />

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

      {bundleBooks.length === 3 && ( // only show bundle if there are at least 3 books
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

      {/*  If user is searching: show ONE grid (so results are consistent) */}
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
















































