const express = require("express");
const router = express.Router();
const db = require("../db");

/* =========================
   POST /api/contacts
   ========================= */
router.post("/", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql =
    "INSERT INTO messages_new (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting message:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.status(201).json({
      message: "Message sent successfully",
      id: result.insertId,
    });
  });
});

/* =========================
   GET /api/contacts
   ========================= */
router.get("/", (req, res) => {
  const sql = "SELECT * FROM messages_new ORDER BY id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ message: "DB error" });
    }

    res.json(results);
  });
});

module.exports = router;