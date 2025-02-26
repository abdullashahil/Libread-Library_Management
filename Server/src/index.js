import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import memberRoutes from "./routes/memberRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import issuanceRoutes from "./routes/issuanceRoutes.js";
import initializeDatabase from "./config/initDB.js";
import userRoutes from "./routes/userRoutes.js";
import { logMessage } from "./logger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Log Middleware for Incoming Requests
app.use((req, res, next) => {
  logMessage("info", "Request", `Incoming request: ${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/", memberRoutes);
app.use("/", bookRoutes);
app.use("/", issuanceRoutes);
app.use("/users", userRoutes);

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello, Docker! Deployment Test Successful 🎉");
  // res.send("Hello from the Express backend!");

  logMessage("info", "Root Route", "Root route accessed");
});

// Global Error Handler
app.use((err, res) => {
  logMessage("error", "Global Error", `Error: ${err.message}`);
  res.status(500).send("Something went wrong!");
});

// Initialize Database and Start Server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    logMessage("info", "serverStart", `Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  logMessage("error", "databaseInit", `Failed to initialize the database: ${err.message}`);
});

