import mongoose from "mongoose";

import User from "./User";
import Course from "./Course";
import Quiz from "./Quiz";
const QuizActivitySchema = new mongoose.Schema(
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
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Quiz,
    },
    score: {
      type: Number,
      default: 0,
    },
    maxScore: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "completed",
    },
    quizType: {
      type: String,
      default: "quiz",
      required: true,
      enum: ["quiz", "assessment"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.QuizActivity || mongoose.model("QuizActivity", QuizActivitySchema);
