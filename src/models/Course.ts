import mongoose from "mongoose";

import Stage from "./Stage";
import Instructor from "./Instructor";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    image: {
      type: String,
      required: [true, "Please provide an image"],
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
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
    enrolled: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Emergency", "Pediatrics", "Neurology", "Cardiology"],
    },
    duration: {
      type: String,
      required: [true, "Please provide a duration"],
    },
    critiqueSessions: {
      type: String,
      required: [true, "Please provide a critique session"],
    },
    topics: [
      {
        type: String,
        required: [true, "Please provide a topic"],
      },
    ],
    features: [
      {
        type: String,
        required: [true, "Please provide a topic"],
      },
    ],
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
