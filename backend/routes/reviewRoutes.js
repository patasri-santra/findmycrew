import express from "express";
import {
  createReview,
  getReviewsIWrote,
  getReviewsAboutMe,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createReview);
router.get("/written-by-me", protect, getReviewsIWrote);
router.get("/about-me", protect, getReviewsAboutMe);

export default router;