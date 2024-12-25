import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection
import QuizActivity from "@/models/QuizActivity";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { course, quiz, score, maxScore, quizType } = await req.json();
  try {
    const existingActivity = await QuizActivity.findOne({ course, quiz });
    if (existingActivity) {
      return NextResponse.json({ message: "Activity already exists" }, { status: 200 });
    }
    const userId = req.headers.get("x-user-id");
    const newActivity = new QuizActivity({
      user: userId,
      course,
      quiz,
      score,
      maxScore,
      quizType,
    });

    await newActivity.save();

    // Return the response
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
