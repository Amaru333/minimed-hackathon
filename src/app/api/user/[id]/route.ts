/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection

import QuizActivity from "@/models/QuizActivity";
import Log from "@/models/Log";
import Certificate from "@/models/Certificate";
import User from "@/models/User";

export async function GET(req: NextRequest, context: any) {
  await dbConnect();
  try {
    const { params } = await context;
    const { id } = await params;
    const userId = id;
    const userData = await User.findById(userId).select("-password");
    const quizActivities = await QuizActivity.find({ user: userId });
    const userCertificates = await Certificate.find({ user: userId }).countDocuments();
    const averageQuizScore =
      quizActivities.reduce((sum, item) => {
        return sum + (item.score / item.maxScore) * 100;
      }, 0) / quizActivities.length;

    const logs = await Log.find({
      user: userId,
      createdAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 10)) }, // Only logs within the last 10 days
    })
      .sort({ createdAt: -1 })
      .select("createdAt")
      .lean();

    // If no logs, return count as 0
    if (!logs || logs.length === 0) {
      return NextResponse.json({ loginCount: 0 }, { status: 200 });
    }

    // Get unique login days ignoring time
    const getDateOnly = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    };

    const uniqueDays = new Set(logs.map((log) => getDateOnly(new Date(log.createdAt)))).size;

    const uniqueDaysScore = uniqueDays / 5;
    const quizScore = averageQuizScore / 20;
    const certificateScore = Math.max(userCertificates / 3, 3);

    // Return the response
    return NextResponse.json(
      {
        user: userData,
        averageQuizScore,
        userScore: uniqueDaysScore + quizScore + certificateScore,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
