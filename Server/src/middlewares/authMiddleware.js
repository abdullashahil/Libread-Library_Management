import jwt from "jsonwebtoken";
import { logMessage } from "../logger.js"; // Import logger

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export const verifyToken = (req, res, next) => {
  if (req.path === "/users/signup" || req.path === "/users/login") {
    logMessage("info", "Auth", `Public route accessed: ${req.path}`);
    return next();
  }

  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    logMessage("warn", "Auth", "Access denied: No token provided.");
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    logMessage("warn", "Auth", "Access denied: Malformed token.");
    return res.status(403).json({ message: "Malformed token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      logMessage("error", "Auth", `Unauthorized access attempt: ${err.message}`);
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user_id = decoded.user_id;
    logMessage("info", "Auth", `User authenticated: ${decoded.user_id}`);
    next();
  });
};
