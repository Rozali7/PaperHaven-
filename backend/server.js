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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
