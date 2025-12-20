const express = require("express");
const router = express.Router();
const db = require("../db");//database connection 

// GET ALL BOOKS
router.get("/", (req, res) => {//handles when frontend is in the books page 
  db.query("SELECT * FROM books", (err, results) => {//get all books 
    if (err) return res.status(500).json({ message: "Error fetching books" });
    res.json(results);//handles the error 
  });
});

// ADD BOOK
router.post("/", (req, res) => {
  const { title, author, price, image } = req.body;

  const sql = "INSERT INTO books (title, author, price, image) VALUES (?, ?, ?, ?)";//prepare the sql
  db.query(sql, [title, author, price, image], (err) => {
    if (err) return res.status(500).json({ message: "Error adding book" });
    res.json({ message: "Book added successfully" });
  });
});

module.exports = router;
