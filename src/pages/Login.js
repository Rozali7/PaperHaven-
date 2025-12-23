import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Auth.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");//stores the email entered by the user 
  const [password, setPassword] = useState("");// ""
  const [error, setError] = useState("");//stores if any error occurs from the backend 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://paperhaven-production-773e.up.railway.app/api/auth/login", {// sends email and password to the backend 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();//converts backend response into javascprit 

      if (!res.ok) {
        // backend gave an error, show it
        setError(data.message || "Login failed");
        return;
      }

      // At this point login succeeded.
      // Expect token + user from backend.
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        if (onLogin) {
          onLogin(data.user);//saves the info in the app.js 
        }
      }

      navigate("/"); // go home after login
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Sign In</h1>
        <p className="auth-subtitle">
          Welcome back to Paper Haven. Please sign in to continue.
        </p>

        {error && <p className="auth-error">{error}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="auth-switch">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </main>
  );
}

export default Login;


