import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Books from "./pages/Books";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./styles/theme.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  // 🛒 Add item to cart
  const handleAddToCart = (book) => {
    const exist = cartItems.find((x) => x.id === book.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === book.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...book, qty: 1 }]);
    }
  };

  // ➖ Remove one quantity
  const handleRemoveFromCart = (book) => {
    const exist = cartItems.find((x) => x.id === book.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== book.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === book.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.qty, 0)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/books"
          element={<Books onAdd={handleAddToCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              onAdd={handleAddToCart}
              onRemove={handleRemoveFromCart}
            />
          }
        />
       <Route
  path="/checkout"
  element={<Checkout setCartItems={setCartItems} />}
/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;













