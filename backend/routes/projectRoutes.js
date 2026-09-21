import express from "express";
import {
  createProject,
  getAllProjects,
  getMyProjects,
  getProjectsIWorkedOn,
  getProjectById,
  closeProject,
} from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getAllProjects);
router.get("/mine", protect, getMyProjects);
router.get("/worked-on", protect, getProjectsIWorkedOn);
router.get("/:id", protect, getProjectById);
router.put("/:id/close", protect, closeProject);

export default router;