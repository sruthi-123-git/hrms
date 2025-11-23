require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth");
const employeeRoutes = require("./src/routes/employees");
const teamRoutes = require("./src/routes/teams");

const app = express();

// Allow CORS from your React frontend
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Root route to check server status
app.get("/", (req, res) => {
  res.send("Server is running");
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/teams", teamRoutes);

// Use PORT from .env or default to 5001
const PORT = process.env.PORT || 5001;


// Bind to all interfaces instead of "127.0.0.1"
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend running on port ${PORT}`);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});
