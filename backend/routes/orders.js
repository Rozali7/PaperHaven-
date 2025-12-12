// backend/routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /api/orders
// Body:
// {
//   "name": "Rozali",
//   "email": "kaissrozali79@gmail.com",
//   "phone": "70099000",
//   "address": "Some address",
//   "totalPrice": 39.97
// }
router.post("/", (req, res) => {
  const { name, email, phone, address, totalPrice } = req.body;

  if (!name || !email || !phone || !address || !totalPrice) {
    return res
      .status(400)
      .json({ message: "All fields and total price are required." });
  }

  const sql =
    "INSERT INTO orders (customer_name, customer_email, customer_phone, customer_address, total_price) VALUES (?, ?, ?, ?, ?)";

  db.query(sql, [name, email, phone, address, totalPrice], (err, result) => {
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


