import mongoose from "mongoose";

import User from "./User";

const LogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: [true, "Please provide a user"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Log || mongoose.model("Log", LogSchema);
