import mongoose from "mongoose";

import Quiz from "./Quiz";
import Lesson from "./Lesson";

const StageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Lesson,
    },
  ],
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Quiz,
  },
});

export default mongoose.models.Stage || mongoose.model("Stage", StageSchema);
