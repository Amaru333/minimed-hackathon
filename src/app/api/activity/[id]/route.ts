/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection
import CourseActivity from "@/models/CourseActivity";
import QuizActivity from "@/models/QuizActivity";
import mongoose from "mongoose";

export async function GET(req: NextRequest, context: any) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract ID from params
    const { params } = await context;
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    const courseActivities = await CourseActivity.find({ course: id, user: userId }).select(
      "course stage lesson"
    );
    const quizActivities = await QuizActivity.find({ course: id, user: userId }).select(
      "course quiz score maxScore quizType"
    );

    // Return the response
    return NextResponse.json({ courseActivities, quizActivities }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
