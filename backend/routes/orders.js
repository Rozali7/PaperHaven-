// backend/routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../db");
router.post("/", (req, res) => {
  const { name, email, phone, address, totalPrice } = req.body;//get the info from backend

  if (!name || !email || !phone || !address || !totalPrice) {//handle the error eza ma fawat info 
    return res
      .status(400)
      .json({ message: "All fields and total price are required." });
  }

  const sql =
    "INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_price) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, phone, address, totalPrice], (err, result) => {//take the info entered from the user and store in the database 
    if (err) {
      console.error("Error inserting order:", err);
      return res
        .status(500)
        .json({ message: "Could not create order. Please try again." });
    }

    return res.status(201).json({
      message: "Order placed successfully",
      orderId: result.insertId,
    });
  });
});

module.exports = router;


