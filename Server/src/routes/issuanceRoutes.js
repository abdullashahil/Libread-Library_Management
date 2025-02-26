import express from "express";
import * as issuanceController from '../controllers/issuanceController.js';
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = express.Router();

// Apply verifyToken to all routes in this router
router.use((req, res, next) => {
    logMessage("info", "Request", `${req.method} ${req.originalUrl} - Incoming request`);
    verifyToken(req, res, next);
});

router.get('/issuances', issuanceController.getIssuances);
router.get('/issuances/:id', issuanceController.getIssuanceById);

router.post('/issuances', issuanceController.createIssuance);
router.put('/issuances/:id', issuanceController.updateIssuance);
router.delete('/issuances/:id', issuanceController.deleteIssuance);
router.get('/issuances/search', issuanceController.searchIssuance);

export default router;
