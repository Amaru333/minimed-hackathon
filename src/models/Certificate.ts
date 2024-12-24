import mongoose from "mongoose";

import User from "./User";
import Course from "./Course";

const CertificateSchema = new mongoose.Schema(
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
    issueDate: {
      type: Date,
      required: [true, "Please provide an issue date"],
      default: Date.now,
    },
    percentage: {
      type: Number,
      required: [true, "Please provide a percentage"],
    },
    expirationDate: {
      type: Date,
      required: [true, "Please provide an expiration date"],
      default: () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 2);
        return date;
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema);
