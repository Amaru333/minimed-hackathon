/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import Stage from "@/models/Stage";
import Lesson from "@/models/Lesson";
import Quiz from "@/models/Quiz";
import Question from "@/models/Question";
import Instructor from "@/models/Instructor";
import CourseActivity from "@/models/CourseActivity";
import QuizActivity from "@/models/QuizActivity";

export async function GET(req: NextRequest, context: any) {
  const { params } = await context;
  const { id } = await params;
  const userId = req.headers.get("x-user-id");
  try {
    // Connect to the database
    await dbConnect();

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // Fetch course details
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

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Process activities
    const courseActivities = await CourseActivity.find({ course: id, user: userId }).select(
      "course stage lesson"
    );
    const quizActivities = await QuizActivity.find({ course: id, user: userId }).select(
      "course quiz score maxScore quizType"
    );

    // Track completed stages, lessons, and quizzes
    const completedLessons = new Set(
      courseActivities.map((activity: any) => activity.lesson.toString())
    );
    const completedQuizzes = new Set(
      quizActivities.map((activity: any) => activity.quiz.toString())
    );

    // console.log(completedLessons, completedQuizzes);

    // Calculate currentStage and currentLesson dynamically
    let currentStage = 0;
    let currentLesson = 0;

    // Map through stages and lessons to mark completion and determine progress
    const formattedStages = course.stages.map((stage: any, stageIndex: number) => {
      let stageCompleted = true;

      // Process lessons
      const lessons = stage.lessons.map((lesson: any, lessonIndex: number) => {
        console.log(
          completedLessons,
          lesson._id.toString(),
          completedLessons.has(lesson._id.toString())
        );
        const isLessonCompleted = completedLessons.has(lesson._id.toString());
        if (!isLessonCompleted && currentStage === 0) {
          currentStage = stageIndex + 1; // Mark the current stage
          currentLesson = lessonIndex + 1; // Mark the current lesson
        }

        // Mark stage as incomplete if any lesson is incomplete
        if (!isLessonCompleted) {
          stageCompleted = false;
        }

        return {
          id: lessonIndex + 1,
          _id: lesson._id.toString(),
          title: lesson.title,
          duration: lesson.duration,
          completed: isLessonCompleted,
        };
      });

      // Process quizzes
      const quiz = {
        id: stage.quiz._id.toString(),
        title: stage.quiz.title,
        completed: completedQuizzes.has(stage.quiz._id.toString()),
        questions: stage.quiz.questions.map((question: any) => ({
          id: question._id.toString(),
          text: question.text,
          options: question.options,
          correctAnswer: question.correctAnswer,
        })),
      };

      // Finalize stage
      return {
        id: stageIndex + 1,
        _id: stage._id.toString(),
        title: stage.title,
        completed: stageCompleted && quiz.completed, // Stage is completed if all lessons and quiz are completed
        lessons,
        quiz,
      };
    });

    console.log(currentStage, currentLesson);

    // Format final response
    const formattedResponse = {
      id: course._id.toString(),
      title: course.title,
      instructor: course.instructor.name,
      type: course.type,
      skillLevel: course.skillLevel,
      duration: course.duration,
      critiqueSessions: course.critiqueSessions,
      currentStage: currentStage || 1, // Default to 1 if no progress is tracked
      currentLesson: currentLesson || 1, // Default to 1 if no progress is tracked
      stages: formattedStages,
    };

    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
