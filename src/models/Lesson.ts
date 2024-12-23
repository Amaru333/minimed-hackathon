import mongoose from "mongoose";

// export interface Lesson {
//     id: number;
//     title: string;
//     duration: string;
//     completed: boolean;
//     current?: boolean;
//   }

const LessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    duration: {
      type: String,
      required: [true, "Please provide a duration"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Lesson || mongoose.model("Lesson", LessonSchema);
