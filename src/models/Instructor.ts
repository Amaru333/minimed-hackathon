import mongoose from "mongoose";

const Instructor = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Instructor || mongoose.model("Instructor", Instructor);
