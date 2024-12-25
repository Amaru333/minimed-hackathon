import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection

import QuizActivity from "@/models/QuizActivity";

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const userId = req.headers.get("x-user-id");
    const quizActivities = await QuizActivity.find({ user: userId });

    const averageQuizScore =
      quizActivities.reduce((sum, item) => {
        return sum + (item.score / item.maxScore) * 100;
      }, 0) / quizActivities.length;

    // Return the response
    return NextResponse.json({ averageQuizScore }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
