import express from "express";
import { updateProfile, deleteAccount } from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/", protect, updateProfile);
router.delete("/", protect, deleteAccount);

export default router;