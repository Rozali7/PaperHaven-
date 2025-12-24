require("dotenv").config();
const mysql = require("mysql2");

// ✅ Use a pool (auto recovers from dropped connections)
const db = mysql.createPool(process.env.DATABASE_URL || process.env.MYSQL_URL);

// Optional: quick test once on startup (won’t crash the app)
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL pool connection failed:", err.message);
  } else {
    console.log("✅ MySQL pool connected");
    connection.release();
  }
});

module.exports = db;