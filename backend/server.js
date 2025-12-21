require("dotenv").config();// call the env file 
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));//authenticated page route 
app.use("/api/books", require("./routes/books"));//books page route 
app.use("/api/orders", require("./routes/orders"));//orders page route 
app.use("/api/contact", require("./routes/contacts")); //contact page route
app.use("/api/admin", require("./routes/admin")); //admin page route
const PORT = process.env.PORT || 8080;
app.get("/seed", (req, res) => {
  const db = require("./db"); // or wherever your db connection is

  const books = [
    ["Atomic Habits", "James Clear", 12.99, "https://picsum.photos/200", "Habits book"],
    ["The Alchemist", "Paulo Coelho", 9.99, "https://picsum.photos/201", "Novel"]
  ];

  db.query(
    "INSERT INTO books (title, author, price, image, description) VALUES ?",
    [books],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }
      res.json({ inserted: result.affectedRows });
    }
  );
});
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
