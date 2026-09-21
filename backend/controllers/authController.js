import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, freelancerType } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      freelancerType,
      emailOTP: otp,
    });

    await sendEmail(
      email,
      "Verify your FindMyCrew account",
      `Your verification code is: ${otp}`
    );

    const token = jwt.sign({ id: newUser._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        freelancerType: newUser.freelancerType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        freelancerType: user.freelancerType,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isEmailVerified) {
      return res.status(400).json({ message: "Email already verified" });
    }

    if (user.emailOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isEmailVerified = true;
    user.emailOTP = undefined;
    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};