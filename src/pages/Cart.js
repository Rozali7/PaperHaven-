import React from "react";
import "../styles/Cart.css";
import { useNavigate } from "react-router-dom";

export default function Cart({ cartItems, onAdd, onRemove }) {
  const navigate = useNavigate();
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="empty">Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div className="cart-info">
                <h3>{item.title}</h3>
                <p>{item.author}</p>
                <div className="cart-actions">
                  <button onClick={() => onRemove(item)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => onAdd(item)}>+</button>
                </div>
              </div>
              <div className="price">${(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}

          <div className="cart-total">
            <h3>Total: ${itemsPrice.toFixed(2)}</h3>
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}












