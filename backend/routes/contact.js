// backend/routes/contact.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET all messages (for Admin Dashboard)
router.get("/", (req, res) => {
  // IMPORTANT: use the REAL table name you created
  const sql = "SELECT * FROM messages_new ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ message: "DB error" });
    }
    res.json(results);
  });
});

// ✅ POST send message (Contact page)
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = "INSERT INTO messages_new (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting message:", err);
      return res.status(500).json({ message: "Could not send message." });
    }

    res.status(201).json({
      message: "Message sent successfully",
      messageId: result.insertId,
    });
  });
});

module.exports = router;