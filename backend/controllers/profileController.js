import User from "../models/User.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, profilePic, freelancerType } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (profilePic) user.profilePic = profilePic;
    if (freelancerType) user.freelancerType = freelancerType;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
        freelancerType: user.freelancerType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await User.findByIdAndDelete(req.userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};