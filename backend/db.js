const mysql = require("mysql2");

const mysql = require("mysql2");

const connection = mysql.createConnection(process.env.DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.error("DB error:", err);
    return;
  }
  console.log("Connected to MySQL");
});

module.exports = connection;

connection.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = connection;
