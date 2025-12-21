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
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  // 🛒 Cart state
  const [cartItems, setCartItems] = useState([]);//stores all items added to cart shared between books,cart,checkout 

  // 👤 Auth state (user)
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");//check if the user is already logged in 
    return stored ? JSON.parse(stored) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);//update user state after login 
  };

  const handleLogout = () => {
    localStorage.removeItem("token");//clears authentication data 
    localStorage.removeItem("user");//removes the user 
    setUser(null);
  };

  // 🛒 Add item to cart
  const handleAddToCart = (book) => {
    const exist = cartItems.find((x) => x.id === book.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === book.id ? { ...exist, qty: exist.qty + 1 } : x
        )//if a book already exist qty+1 , if new book qty:1 
      );
    } else {
      setCartItems([...cartItems, { ...book, qty: 1 }]);
    }
  };

  // ➖ Remove one quantity
  const handleRemoveFromCart = (book) => {//this function update the cart safely 
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
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.qty, 0)}
        user={user}
        onLogout={handleLogout}//navbar receives dynamic data through props 
      />

      <Routes>
        {/* 👇 pass user and logout to Home */}
        <Route
          path="/"
          element={<Home user={user} onLogout={handleLogout} />}
        />
        <Route path="/admin" element={<AdminDashboard user={user} />} />

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
          element={
            <Checkout
              cartItems={cartItems}
              setCartItems={setCartItems}
            />
          }
        />

        {/* Auth routes */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<Register onLogin={handleLogin} />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
















