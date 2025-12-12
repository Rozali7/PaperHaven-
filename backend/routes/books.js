const express = require("express");
const router = express.Router();
const db = require("../db");

// GET ALL BOOKS
router.get("/", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching books" });
    res.json(results);
  });
});

// ADD BOOK
router.post("/", (req, res) => {
  const { title, author, price, image } = req.body;

  const sql = "INSERT INTO books (title, author, price, image) VALUES (?, ?, ?, ?)";
  db.query(sql, [title, author, price, image], (err) => {
    if (err) return res.status(500).json({ message: "Error adding book" });
    res.json({ message: "Book added successfully" });
  });
});

module.exports = router;
