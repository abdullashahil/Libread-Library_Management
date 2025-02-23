import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

// Sign up
export const signup = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Check if user already exists
      const userCheck = await query("SELECT * FROM users WHERE username = $1", [username]);
      if (userCheck.rows.length > 0) {
        return res.status(400).json({ error: "User already exists" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert into DB
      const result = await query(
        "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id",
        [username, hashedPassword]
      );
  
      const newUserId = result.rows[0].user_id;
  
      // Generate JWT right away so user doesn't need a separate login
      const token = jwt.sign({ user_id: newUserId }, SECRET_KEY, { expiresIn: "1h" });
  
      // Return token along with a success message
      res.json({
        message: "User registered successfully!",
        token,
      });
    } catch (err) {
      console.error("Error signing up:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const userResult = await query("SELECT * FROM users WHERE username = $1", [username]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = userResult.rows[0];

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY, { expiresIn: "1h" });
    console.log("second", token)

    res.json({ token });
  } catch (err) {
    console.error("Error logging in:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
