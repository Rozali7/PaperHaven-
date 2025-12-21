// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Admin email (only THIS email will be treated as admin)
const ADMIN_EMAIL = "kaissrozali79@gmail.com";

// Helper to create JWT that assures eno user is authenticated 
function createToken(userId) {
  // ✅ Creates a token that contains the user ID
  // ✅ JWT is used later to prove the user is logged in
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // token expires after 1 day
  });
}

router.post("/signup", (req, res) => { //handle when the user joins 
  const { name, email, password } = req.body;// recieve the data entered by the user 

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
    const hashedPassword = bcrypt.hashSync(password, 10); // ✅ encrypt password before saving

    // 3) Insert new user
    const insertSql =
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)";// prepare the query to new user 
    db.query(insertSql, [name, email, hashedPassword], (err, result) => {// add the real results 
      if (err) {
        console.error("Error inserting new user:", err);
        return res
          .status(500)
          .json({ message: "Something went wrong. Please try again." });
      }

      const userId = result.insertId;//retrive the newly created user ID 
      const token = createToken(userId); // ✅ create token after successful signup

      // ✅ Determine if this new user is admin (ONLY if email matches ADMIN_EMAIL)
      const isAdmin = email === ADMIN_EMAIL;

      return res.status(201).json({
        message: "Signup successful",
        token,
        user: {
          id: userId,
          name,
          email,
          isAdmin, // ✅ added so frontend knows if admin or not
        },
      });
    });
  });
});

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

    const user = results[0]; // ✅ user record from database

    // Compare password with hashed password
    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = createToken(user.id); // ✅ create token after successful login

    // ✅ Determine if THIS user is admin (ONLY if email matches ADMIN_EMAIL)
    const isAdmin = user.email === ADMIN_EMAIL;

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin, // ✅ added so frontend can show Admin Dashboard link
      },
    });
  });
});

module.exports = router;// alow server.js to use these routes



