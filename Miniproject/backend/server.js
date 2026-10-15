
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const testRoutes = require("./routes/testRoutes");
const memberRoutes = require("./routes/memberRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test API
app.use("/api/test", testRoutes);

// Member CRUD APIs
app.use("/api/members", memberRoutes);

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Start server after connecting to MongoDB
const startServer = async () => {
  try {
    await connectDB();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Test API: http://localhost:5000/api/test");
      console.log("Members API: http://localhost:5000/api/members");
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
