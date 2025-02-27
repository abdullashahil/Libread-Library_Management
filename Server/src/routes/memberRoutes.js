import express from "express";
import * as memberController from '../controllers/memberController.js'
import { verifyToken } from "../middlewares/authMiddleware.js"
import { logMessage } from "../logger.js";

const router = express.Router();

// Apply verifyToken to all routes in this router
// router.use((req, res, next) => {
//     logMessage("info", "Request", `${req.method} ${req.originalUrl} - Incoming request`);
//     verifyToken(req, res, next);
// });

router.get('/members', memberController.getMembers);
router.get('/members/:id', memberController.getMemberById);
router.post('/members', memberController.createMember);
router.put('/members/:id', memberController.updateMember);
router.delete('/members/:id', memberController.deleteMember);

export default router;