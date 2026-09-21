import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: { type: [String], required: true },
    paymentOffer: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hiredUser: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    status: { type: String, enum: ["open", "closed"], default: "open" },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);