import React, { useState } from "react";
import "../styles/Books.css";

const bookData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 11.99,
    image: "https://m.media-amazon.com/images/I/81af+MCATTL._AC_UF1000,1000_QL80_.jpg",
    description:
      "A timeless classic about love, ambition, and the pursuit of the American Dream.",
  },
  {
    id: 2,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 13.49,
    image: "https://m.media-amazon.com/images/I/81eB+7+CkUL.jpg",
    description:
      "A library between life and death where each book offers a new version of your life.",
  },
  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 12.49,
    image: "https://m.media-amazon.com/images/I/71aFt4+OTOL.jpg",
    description:
      "A story about following your dreams and listening to your heart’s deepest desires.",
  },
  {
    id: 4,
    title: "Educated",
    author: "Tara Westover",
    price: 13.99,
    image: "https://m.media-amazon.com/images/I/81WojUxbbFL.jpg",
    description:
      "A memoir about breaking free from ignorance and discovering the power of education.",
  },
  {
    id: 5,
    title: "Atomic Habits",
    author: "James Clear",
    price: 12.99,
    image: "https://m.media-amazon.com/images/I/91bYsX41DVL.jpg",
    description:
      "A practical guide to forming good habits and transforming your life through small steps.",
  },
  {
    id: 6,
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 11.49,
    image: "https://m.media-amazon.com/images/I/71QKQ9mwV7L.jpg",
    description:
      "A bold and refreshing approach to living a happier life by focusing on what truly matters.",
  },
  {
    id: 7,
    title: "Becoming",
    author: "Michelle Obama",
    price: 15.49,
    image: "https://m.media-amazon.com/images/I/81h2gWPTYJL.jpg",
    description:
      "An inspiring memoir about growth, identity, and empowerment by Michelle Obama.",
  },
  {
    id: 8,
    title: "The Book Thief",
    author: "Markus Zusak",
    price: 10.99,
    image: "https://m.media-amazon.com/images/I/91dSMhdIzTL.jpg",
    description:
      "A haunting and moving tale set in Nazi Germany, narrated by Death itself.",
  },
];

export default function Books({ onAdd }) {
  const [flipped, setFlipped] = useState(null);

  const handleFlip = (id) => {
    setFlipped(flipped === id ? null : id);
  };

  return (
    <div className="books-page">
      <h1 className="books-title">Our Book Collection</h1>
      <p className="books-subtitle">
        Discover stories that inspire, educate, and stay with you.
      </p>
      <p className="books-tip">
  💡 Flip each book to read a short description or add it to your cart.
</p>


      <div className="books-grid">
        {bookData.map((book) => (
          <div
            key={book.id}
            className={`book-card ${flipped === book.id ? "flipped" : ""}`}
            onClick={() => handleFlip(book.id)}
          >
            <div className="book-card-inner">
              <div className="book-card-front">
                <img src={book.image} alt={book.title} />
                <h3>{book.title}</h3>
                <p className="author">{book.author}</p>
                <p className="price">${book.price.toFixed(2)}</p>
              </div>

              <div className="book-card-back">
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <button
                  className="add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(book);
                  }}
                >
                  Interested in "{book.title}"? Add to Cart ✨
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
































