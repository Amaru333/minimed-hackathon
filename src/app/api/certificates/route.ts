/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection

import Certificate from "@/models/Certificate";
import QuizActivity from "@/models/QuizActivity";

export async function POST(req: NextRequest) {
  await dbConnect();

  const userId = req.headers.get("x-user-id");
  const { course } = await req.json();
  try {
    const existingCertificate = await Certificate.findOne({ course, user: userId });
    if (existingCertificate) {
      return NextResponse.json(existingCertificate, { status: 200 });
    }

    const activities = await QuizActivity.find({ course, user: userId }).select(
      "score maxScore quizType"
    );
    function getWeightedPercentages(activities: any[]) {
      // Separate "quiz" and "assessment" activities
      const quizActivities = activities.filter(
        (item: { quizType: string }) => item.quizType === "quiz"
      );
      const assessmentActivities = activities.filter(
        (item: { quizType: string }) => item.quizType === "assessment"
      );

      // Helper function to calculate average percentage of an array of activities
      const calculateAveragePercentage = (arr: any[]) => {
        if (arr.length === 0) return 0;
        const totalPercentage = arr.reduce(
          (sum: number, item: { score: number; maxScore: number }) => {
            return sum + (item.score / item.maxScore) * 100;
          },
          0
        );
        return totalPercentage / arr.length;
      };

      // Calculate average percentages
      const quizAvg = calculateAveragePercentage(quizActivities);
      const assessmentAvg = calculateAveragePercentage(assessmentActivities);

      // Apply weightage: 25% for quizzes and 75% for assessments
      const combined = quizAvg * 0.25 + assessmentAvg * 0.75;

      // Return an object containing all three values
      return combined;
    }

    const finalPercentage = getWeightedPercentages(activities);

    const newCertificate = new Certificate({
      user: userId,
      course,
      percentage: finalPercentage,
    });

    await newCertificate.save();

    // Return the response
    return NextResponse.json(newCertificate, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  const userId = req.headers.get("x-user-id");
  try {
    const certificates = await Certificate.find({ user: userId }).populate("course", "title slug");

    // Return the response
    return NextResponse.json({ certificates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
