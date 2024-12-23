/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb"; // MongoDB connection
import Course from "@/models/Course";
import Stage from "@/models/Stage";
import Lesson from "@/models/Lesson";
import Quiz from "@/models/Quiz";
import Question from "@/models/Question";
import Instructor from "@/models/Instructor";

// Connect to the database
await dbConnect();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // Extract ID from URL

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // Find the course by ID and populate fields
    const course = await Course.findById(id)
      .populate({
        path: "instructor",
        model: Instructor,
      })
      .populate({
        path: "stages",
        model: Stage,
        populate: [
          {
            path: "lessons",
            model: Lesson,
          },
          {
            path: "quiz",
            model: Quiz,
            populate: {
              path: "questions",
              model: Question,
            },
          },
        ],
      });

    // Check if course exists
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Format response similar to the given JSON structure
    const formattedResponse = {
      id: course._id,
      title: course.title,
      instructor: course.instructor.name,
      type: course.type,
      skillLevel: course.skillLevel,
      duration: course.duration,
      critiqueSessions: course.critiqueSessions,
      currentStage: 0, // Example: you can calculate this dynamically if needed
      currentLesson: 0, // Example: you can calculate this dynamically if needed
      stages: course.stages.map((stage: any) => ({
        id: stage._id,
        title: stage.title,
        completed: false, // Placeholder, modify based on actual completion logic
        lessons: stage.lessons.map((lesson: any) => ({
          id: lesson._id,
          title: lesson.title,
          duration: lesson.duration,
          completed: false, // Placeholder, modify based on actual completion logic
        })),
        quiz: {
          id: stage.quiz._id,
          title: stage.quiz.title,
          questions: stage.quiz.questions.map((question: any) => ({
            id: question._id,
            text: question.text,
            options: question.options,
            correctAnswer: question.correctAnswer,
          })),
        },
      })),
    };

    // Return the formatted response
    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
