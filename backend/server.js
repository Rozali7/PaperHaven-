require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ✅ CORS (FIXED)
app.use(
  cors({
    origin: [
      "https://paperhaven-production-773e.up.railway.app", // ✅ FRONTEND (exact)
      "http://localhost:3000"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);

// ✅ Handle preflight requests
app.options(/.*/, cors());

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/contact", require("./routes/contacts"));
app.use("/api/admin", require("./routes/admin"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
