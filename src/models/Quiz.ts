import mongoose from "mongoose";
import Question from "./Question";

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Question,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
