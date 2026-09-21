import Review from "../models/Review.js";
import Project from "../models/Project.js";

export const createReview = async (req, res) => {
  try {
    const { projectId, revieweeId, rating, comment } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.status !== "closed") {
      return res.status(400).json({ message: "You can only review a project after it is closed" });
    }

    if (revieweeId === req.userId) {
      return res.status(400).json({ message: "You cannot review yourself" });
    }

    const review = await Review.create({
      project: projectId,
      reviewer: req.userId,
      reviewee: revieweeId,
      rating,
      comment,
    });

    res.status(201).json({ message: "Review submitted successfully", review });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getReviewsIWrote = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.userId })
      .populate("reviewee", "name email")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getReviewsAboutMe = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.userId })
      .populate("reviewer", "name email")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};