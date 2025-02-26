import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../config/db.js";
import dotenv from "dotenv";
import { logMessage } from "../logger.js";

dotenv.config();
const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

// Sign up
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        logMessage("info", "Signup", `Signup request received for username: ${username}`);

        // Check if user already exists
        const userCheck = await query("SELECT * FROM users WHERE username = $1", [username]);
        if (userCheck.rows.length > 0) {
            logMessage("warn", "Signup", `User already exists: ${username}`);
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        logMessage("info", "Signup", `Password hashed for username: ${username}`);

        // Insert into DB
        const result = await query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id",
            [username, hashedPassword]
        );

        const newUserId = result.rows[0].user_id;
        logMessage("info", "Signup", `User registered successfully with ID: ${newUserId}`);

        // Generate JWT
        const token = jwt.sign({ user_id: newUserId }, SECRET_KEY, { expiresIn: "1h" });
        logMessage("info", "Signup", `JWT token generated for user ID: ${newUserId}`);

        res.json({
            message: "User registered successfully!",
            token,
        });
    } catch (err) {
        logMessage("error", "Signup", `Error signing up: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        logMessage("info", "Login", `Login request received for username: ${username}`);

        // Check if user exists
        const userResult = await query("SELECT * FROM users WHERE username = $1", [username]);
        if (userResult.rows.length === 0) {
            logMessage("warn", "Login", `Invalid login attempt - user not found: ${username}`);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const user = userResult.rows[0];
        logMessage("info", "Login", `User found with ID: ${user.user_id}`);

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            logMessage("warn", "Login", `Invalid login attempt - incorrect password for username: ${username}`);
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ user_id: user.user_id }, SECRET_KEY, { expiresIn: "1h" });
        logMessage("info", "Login", `JWT token generated for user ID: ${user.user_id}`);

        res.json({ token });
    } catch (err) {
        logMessage("error", "Login", `Error logging in: ${err.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
