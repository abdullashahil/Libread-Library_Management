import express from "express";
import * as bookController from "../controllers/bookController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { logMessage } from "../logger.js";

const router = express.Router();

// Apply verifyToken to all routes in this router
router.use((req, res, next) => {
    logMessage("info", "Request", `${req.method} ${req.originalUrl} - Incoming request`);
    verifyToken(req, res, next);
});

router.get("/books", bookController.getBooks);
router.get("/books/:id", bookController.getBookById);
router.post("/books", bookController.addBook);
router.put("/books/:id", bookController.updateBook);
router.delete("/books/:id", bookController.deleteBook);

export default router;
