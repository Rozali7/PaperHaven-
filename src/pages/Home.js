import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("signin");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
    phone: "",
  });

  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  const closeAuth = () => {
    setAuthOpen(false);
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirm: "",
      phone: "",
    });
  };

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submitSignIn = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      alert("Please enter your email and password.");
      return;
    }
    alert("Signed in successfully (demo).");
    closeAuth();
  };

  const submitSignUp = (e) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      alert("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirm) {
      alert("Passwords do not match.");
      return;
    }
    alert("Account created (demo). You can now sign in.");
    setAuthMode("signin");
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Quiet Story</h1>
          <p>
            PaperHaven is a calm corner for readers—soft design, curated picks,
            and a gentle flow.
          </p>
          <div className="actions">
            <button className="btn" onClick={() => navigate("/books")}>
              Explore Books
            </button>
            <button className="btn-outline" onClick={() => openAuth("signin")}>
              Sign In / Join
            </button>
          </div>
        </div>
      </section>

      {/* AUTH MODAL */}
      {authOpen && (
        <div className="auth-overlay" onClick={closeAuth}>
          <div
            className="auth-modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="auth-header">
              <h3>{authMode === "signin" ? "Sign In" : "Create Account"}</h3>
              <button className="auth-close" onClick={closeAuth} aria-label="Close">
                ×
              </button>
            </div>

            {authMode === "signin" ? (
              <form className="auth-form" onSubmit={submitSignIn}>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Password
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </label>
                <button type="submit" className="btn">
                  Sign In
                </button>
                <p className="auth-switch">
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="linklike"
                    onClick={() => setAuthMode("signup")}
                  >
                    Create one
                  </button>
                </p>
              </form>
            ) : (
              <form className="auth-form" onSubmit={submitSignUp}>
                <div className="grid-2">
                  <label>
                    First name
                    <input
                      type="text"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      type="text"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </label>

                <div className="grid-2">
                  <label>
                    Password
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                  </label>
                  <label>
                    Confirm password
                    <input
                      type="password"
                      name="confirm"
                      value={form.confirm}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                <label>
                  Phone (optional)
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+961 70 123 456"
                  />
                </label>

                <button type="submit" className="btn">
                  Create Account
                </button>
                <p className="auth-switch">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="linklike"
                    onClick={() => setAuthMode("signin")}
                  >
                    Sign in
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

















