import mongoose from "mongoose";

import User from "./User";
import Course from "./Course";

const EnrollmentSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["enrolled", "completed"],
      default: "enrolled",
    },
    enrolledOn: {
      type: Date,
      default: Date.now,
    },
    completedOn: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Enrollment || mongoose.model("Enrollment", EnrollmentSchema);
