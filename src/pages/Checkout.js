import React, { useState } from "react";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout({ setCartItems }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placed
    setOrderPlaced(true);
    // Clear the cart completely
    setCartItems([]);
    // Optionally reset localStorage if you’re using it for cart persistence
    localStorage.removeItem("cartItems");
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {!orderPlaced ? (
        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>
      ) : (
        <div className="order-confirmation">
          <h2>🎉 Thank you for your order!</h2>
          <p>Your books will reach you soon.</p>
          <button
            className="continue-btn"
            onClick={() => navigate("/books")}
          >
            Continue Shopping 📚
          </button>
        </div>
      )}
    </div>
  );
}




