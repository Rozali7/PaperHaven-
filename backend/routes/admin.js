// backend/routes/admin.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET total orders count
router.get("/orders/count", (req, res) => {
  const sql = "SELECT COUNT(*) AS totalOrders FROM orders";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching orders count" });
    res.json(results[0]);
  });
});

// ✅ GET total messages count
router.get("/messages/count", (req, res) => {
  const sql = "SELECT COUNT(*) AS totalMessages FROM messages";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching messages count" });
    res.json(results[0]);
  });
});

// ✅ GET all orders (latest first)
router.get("/orders", (req, res) => {
  const sql = "SELECT * FROM orders ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching orders" });
    res.json(results);
  });
});

// ✅ GET all messages (latest first)
router.get("/messages", (req, res) => {
  const sql = "SELECT * FROM messages ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching messages" });
    res.json(results);
  });
});

module.exports = router;