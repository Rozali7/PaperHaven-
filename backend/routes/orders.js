// backend/routes/orders.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// ✅ GET all orders (for admin dashboard list)
router.get("/", (req, res) => {
  const sql = "SELECT * FROM orders_new ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err); //debug
      return res.status(500).json({ message: "DB error" });
    }
    res.json(results); //send orders to frontend
  });
});

// ✅ GET order items (books purchased inside an order)
router.get("/:id/items", (req, res) => {
  const orderId = req.params.id; //the order we want its items

  const sql = "SELECT * FROM order_items WHERE order_id = ? ORDER BY id DESC";
  db.query(sql, [orderId], (err, results) => {
    if (err) {
      console.error("Error fetching order items:", err); //debug
      return res.status(500).json({ message: "DB error" });
    }
    res.json(results); //send items list to frontend
  });
});

// ✅ POST create order + save books (items) into order_items table
router.post("/", (req, res) => {
  const { name, email, phone, address, totalPrice, items } = req.body; //get the info from frontend

  //handle error if missing fields
  if (!name || !email || !phone || !address || !totalPrice) {
    return res
      .status(400)
      .json({ message: "All fields and total price are required." });
  }

  //items should be an array of books from cart
  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Order items are required." });
  }

  //1) insert into orders table first
  const sqlOrder =
    "INSERT INTO orders_new (customer_name, customer_email, customer_phone, customer_address, total_price) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sqlOrder,
    [name, email, phone, address, totalPrice],
    (err, result) => {
      if (err) {
        console.error("Error inserting order:", err); //debug
        return res
          .status(500)
          .json({ message: "Could not create order. Please try again." });
      }

      const orderId = result.insertId; //new order id created

      //2) insert each book into order_items (bulk insert ✅)
      const sqlItem =
        "INSERT INTO order_items (order_id, book_id, title, price, qty, image) VALUES ?";

      const values = items.map((b) => [
        orderId,
        Number.isFinite(Number(b.id)) ? Number(b.id) : null, //safe book_id
        b.title || "Unknown",
        Number(b.price || 0),
        Number(b.qty || 1),
        b.image || "",
      ]);

      db.query(sqlItem, [values], (err2) => {
        if (err2) {
          console.error("Error inserting order items:", err2); //debug
          return res
            .status(500)
            .json({ message: "Order created but items failed." });
        }

        return res.status(201).json({
          message: "Order placed successfully",
          orderId,
        });
      });
    }
  );
});

// ✅ DELETE an order (admin) + delete its items too
router.delete("/:id", (req, res) => {
  const orderId = req.params.id; //which order to delete

  //delete items first to avoid leftovers
  db.query("DELETE FROM order_items WHERE order_id = ?", [orderId], (err) => {
    if (err) {
      console.error("Error deleting order items:", err); //debug
      return res
        .status(500)
        .json({ message: "DB error deleting order items" });
    }

    //then delete the order
    db.query("DELETE FROM orders_new WHERE id = ?", [orderId], (err2) => {
      if (err2) {
        console.error("Error deleting order:", err2); //debug
        return res.status(500).json({ message: "DB error deleting order" });
      }

      res.json({ message: "Order deleted successfully" }); //send success
    });
  });
});

module.exports = router; //allow server.js to use these routes


