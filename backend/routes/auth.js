// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper to create JWT
function createToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // 1) Check if email already exists
  const checkSql = "SELECT id FROM users WHERE email = ?";
  db.query(checkSql, [email], (err, results) => {
    if (err) {
      console.error("Error checking existing user:", err);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // 2) Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 3) Insert new user
    const insertSql =
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";
    db.query(insertSql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("Error inserting new user:", err);
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again." });
      }

      const userId = result.insertId;
      const token = createToken(userId);

      return res.status(201).json({
        message: "Signup successful",
        token,
        user: {
          id: userId,
          name,
          email,
        },
      });
    });
  });
});

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required" });
  }

  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare password with hashed password
    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken(user.id);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
});

module.exports = router;



