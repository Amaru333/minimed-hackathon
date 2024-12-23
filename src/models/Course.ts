import mongoose from "mongoose";

import Stage from "./Stage";
import Instructor from "./Instructor";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Instructor,
    },
    type: {
      type: String,
      required: [true, "Please provide a type"],
      enum: ["lesson", "quiz"],
    },
    skillLevel: {
      type: String,
      required: [true, "Please provide a skill level"],
    },
    duration: {
      type: String,
      required: [true, "Please provide a duration"],
    },
    critiqueSessions: {
      type: String,
      required: [true, "Please provide a critique session"],
    },
    stages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Stage,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", CourseSchema);
