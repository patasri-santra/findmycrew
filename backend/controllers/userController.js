import User from "../models/User.js";
import Review from "../models/Review.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "name email freelancerType profilePic createdAt"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reviews = await Review.find({ reviewee: req.params.id })
      .populate("reviewer", "name")
      .populate("project", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({ user, reviews });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};