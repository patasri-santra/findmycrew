import Project from "../models/Project.js";
import User from "../models/User.js";

export const createProject = async (req, res) => {
  try {
    const { title, description, skillsRequired, paymentOffer } = req.body;

    const project = await Project.create({
      title,
      description,
      skillsRequired,
      paymentOffer,
      postedBy: req.userId,
    });

    res.status(201).json({ message: "Project posted successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: "open" })
      .populate("postedBy", "name email freelancerType")
      .populate("hiredUser", "name email freelancerType")
      .sort({ createdAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("postedBy", "name email freelancerType")
      .populate("hiredUser", "name email freelancerType");

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const closeProject = async (req, res) => {
  try {
    const { hiredEmail } = req.body;

    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.postedBy.toString() !== req.userId) {
      return res.status(403).json({ message: "You are not allowed to close this project" });
    }

    const hiredUser = await User.findOne({ email: hiredEmail });
    if (!hiredUser) {
      return res.status(404).json({ message: "No FindMyCrew member found with that email" });
    }

    project.status = "closed";
    project.hiredUser = hiredUser._id;
    await project.save();

    const updatedProject = await Project.findById(project._id)
      .populate("postedBy", "name email freelancerType")
      .populate("hiredUser", "name email freelancerType");

    res.status(200).json({ message: "Project marked as closed", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ postedBy: req.userId })
      .populate("postedBy", "name email freelancerType")
      .populate("hiredUser", "name email freelancerType")
      .sort({ createdAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getProjectsIWorkedOn = async (req, res) => {
  try {
    const projects = await Project.find({ hiredUser: req.userId })
      .populate("postedBy", "name email freelancerType")
      .populate("hiredUser", "name email freelancerType")
      .sort({ createdAt: -1 });

    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};