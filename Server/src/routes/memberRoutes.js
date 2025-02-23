import express from "express";
import * as memberController from '../controllers/memberController.js'
import { verifyToken } from "../middlewares/authMiddleware.js"

const router = express.Router();

// Apply verifyToken to all routes in this router
router.use(verifyToken);

router.get('/members', memberController.getMembers);
router.get('/members/:id', memberController.getMemberById);
router.post('/members', memberController.createMember);
router.put('/members/:id', memberController.updateMember);
router.delete('/members/:id', memberController.deleteMember);

export default router;