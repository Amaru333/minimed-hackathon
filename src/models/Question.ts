import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Please provide a text"],
    },
    options: {
      type: [String],
      required: [true, "Please provide options"],
    },
    correctAnswer: {
      type: Number,
      required: [true, "Please provide a correct answer"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Question || mongoose.model("Question", QuestionSchema);
