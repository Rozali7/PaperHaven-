import React from "react";
import "./../styles/Books.css";

const BookCard = ({ book, onAdd }) => {//book- object contating book data - on add function to add to the cart
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <h4>{book.title}</h4>
      <p className="author">{book.author}</p>
      <p className="price">${book.price}</p>
      <button onClick={() => onAdd(book)}>+ Add to Cart</button>
    </div>
  );
};

export default BookCard;
