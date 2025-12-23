import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";//used to move between pages without reloading 
import "../styles/Auth.css";

export default function Register({ onLogin }) {//get onlogin from the app.js 
  const navigate = useNavigate();//allows redirecting the user after login 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });//stores all info entered by the user 

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();//prevent page refresh 
    setError("");

    // basic frontend validation
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
     setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("https://paperhaven-production-773e.up.railway.app/api/auth/signup", {//sends the data to the backend 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();//converts backend response  into javascript 

      // If backend sent an error status (400, 409, 500, ...)
      if (!res.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      // ✅ Signup succeeded at this point.
      // Two possible backends:
      // 1) returns { message, user, token }
      // 2) returns just { message }

      if (data.user && data.token) {
        // Case 1: auto-login after signup
        localStorage.setItem("token", data.token);//save login info in the browser 
        localStorage.setItem("user", JSON.stringify(data.user));
        if (onLogin) onLogin(data.user);//update user state in app.js 
        navigate("/"); // go home
      } else {
        // Case 2: signup OK, but no token/user in response
        // Just send user to login page
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Your Account</h1>
        <p className="auth-subtitle">
          Join PaperHaven to save your favorites and keep your cart in sync.
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Rozali Kaiss"
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>

          <div className="auth-grid">
            <label>
              Password
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Choose a password"
                required
              />
            </label>

            <label>
              Confirm Password
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </label>
          </div>

          <button className="auth-submit" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Join PaperHaven"}
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-link"> 
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}




