const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');

// Use environment variables for deployment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/todo';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection failed:", err.message));

// CORS — dynamically allow localhost and any Vercel deployments
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || 
        origin.startsWith("http://localhost:") || 
        origin.endsWith(".vercel.app")) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  }
}));
app.use(express.json());

app.use("/api/todo", require("./routes/Todo"));

app.use("/", (req, res) => {
  res.send("API is running ✅");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});