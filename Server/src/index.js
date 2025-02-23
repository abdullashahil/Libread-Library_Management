import express from 'express';
import cors from "cors";
import memberRoutes from "../src/routes/memberRoutes.js";
import bookRoutes from "../src/routes/bookRoutes.js";
import issuanceRoutes from "../src/routes/issuanceRoutes.js";
import initializeDatabase from './config/initDB.js';
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

app.use('/', memberRoutes);
app.use('/', bookRoutes);
app.use('/', issuanceRoutes);
app.use("/users", userRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello from the Express backend!');
});

// Initialize the database, then start the server
initializeDatabase().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to initialize the database', err);
});
