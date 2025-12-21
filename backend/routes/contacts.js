// backend/routes/contact.js
const express = require("express");
const router = express.Router();
const db = require("../db"); //database connection

// POST /api/contact
router.post("/", (req, res) => {
  const { name, email, message } = req.body; //take data from frontend

  //basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }
  // ✅ GET all messages (for Admin Dashboard)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "DB error" });
    res.json(results);
  });
});

  //prepare SQL to insert the message into messages table
  const sql =
    "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  //execute query and send response back
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting message:", err);
      return res
        .status(500)
        .json({ message: "Could not send message. Please try again." });
    }

    //success
    return res.status(201).json({
      message: "Message sent successfully",
      messageId: result.insertId,
    });
  });
});

module.exports = router;