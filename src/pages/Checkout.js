import React, { useMemo, useState } from "react";
import "../styles/Checkout.css";
import { useNavigate } from "react-router-dom";

export default function Checkout({ cartItems, setCartItems }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState("");
  const [isPlacing, setIsPlacing] = useState(false); // ✅ prevent double submit
  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
  }, [cartItems]);

  // simple shipping rule (UI only) – keep it 0 to stay simple
  const shipping = 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1) Check cart not empty
    if (!cartItems || cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    // 2) Calculate total price (uses qty from App.js)
    const totalPrice = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    try {
      setIsPlacing(true);

      // 3) Send order to backend (✅ unchanged logic)
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Order failed. Please try again.");
        setIsPlacing(false);
        return;
      }

      // 4) Success: clear cart & show thank-you message
      setOrderPlaced(true);
      setCartItems([]);
      localStorage.removeItem("cartItems");
      setIsPlacing(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while placing your order.");
      setIsPlacing(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {error && <p className="checkout-error">{error}</p>}

      {!orderPlaced ? (
        <div className="checkout-layout">
          {/* LEFT: Form */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2 className="checkout-section-title">Shipping Details</h2>

            <div className="field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+961..."
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Shipping Address</label>
              <input
                type="text"
                name="address"
                placeholder="Street, City, Building..."
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="place-order-btn" disabled={isPlacing}>
              {isPlacing ? "Placing Order..." : "Place Order"}
            </button>

            <p className="checkout-note">
              By placing your order, you agree to Paper Haven’s checkout policy.
            </p>
          </form>

          {/* RIGHT: Order summary */}
          <aside className="order-summary">
            <h2 className="checkout-section-title">Order Summary</h2>

            {(!cartItems || cartItems.length === 0) ? (
              <p className="summary-empty">Your cart is empty.</p>
            ) : (
              <>
                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div className="summary-item" key={item.id}>
                      <div className="summary-thumb">
                        <img src={item.image} alt={item.title} />
                      </div>

                      <div className="summary-info">
                        <div className="summary-title">{item.title}</div>
                        <div className="summary-meta">
                          Qty: {item.qty} · ${Number(item.price).toFixed(2)}
                        </div>
                      </div>

                      <div className="summary-line-total">
                        ${(Number(item.price) * Number(item.qty)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="summary-totals">
                  <div className="row">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="row">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="row total">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => navigate("/books")}
                >
                  Continue Shopping
                </button>
              </>
            )}
          </aside>
        </div>
      ) : (
        <div className="order-confirmation">
          <h2>🎉 Thank you, {formData.name}!</h2>
          <p>
            Your order has been received and is now being processed.
            You’ll receive a confirmation email shortly at{" "}
            <strong>{formData.email}</strong>.
          </p>
          <p>We appreciate your trust in PaperHaven. Enjoy your new reads! 📚</p>

          <button className="continue-btn" onClick={() => navigate("/books")}>
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}










