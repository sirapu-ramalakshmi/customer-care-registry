const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const customerRoutes = require("./routes/customerRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Customer Care Registry Backend is Running 🚀");
});

// API Routes
app.use("/api/customers", customerRoutes);
app.use("/api/complaints", complaintRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log("MONGO_URI =", process.env.MONGO_URI);
});