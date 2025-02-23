import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";

export const verifyToken = (req, res, next) => {
  if (req.path === "/users/signup" || req.path === "/users/login") {
    return next();
  }
  // Expect the token in the "Authorization" header as "Bearer <token>"
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Malformed token" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user_id = decoded.user_id;
    next();
  });
};
