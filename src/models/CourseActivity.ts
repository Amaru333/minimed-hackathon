import mongoose from "mongoose";

import User from "./User";
import Course from "./Course";
import Stage from "./Stage";
import Lesson from "./Lesson";

const CourseActivitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "Please provide a user"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Course,
      required: [true, "Please provide a course"],
    },
    stage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Stage,
    },
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Lesson,
    },
    status: {
      type: String,
      default: "completed",
    },
  },
  { timestamps: true }
);

export default mongoose.models.CourseActivity ||
  mongoose.model("CourseActivity", CourseActivitySchema);
