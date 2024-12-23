/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";
import Instructor from "@/models/Instructor";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch all courses with instructor populated
    const courses = await Course.find({})
      .populate({
        path: "instructor",
        model: Instructor,
        select: "name", // Only fetch the name of the instructor
      })
      .lean(); // Convert to plain JavaScript objects

    // Format the response based on requirements
    const formattedCourses = courses.map((course: any) => ({
      id: course._id,
      title: course.title,
      description: course.description,
      image: course.image || "/extras/course-placeholder.png", // Provide a default image
      duration: course.duration,
      level: course.skillLevel,
      enrolled: course.enrolled || 0,
      rating: course.rating || 0,
      instructor: course.instructor?.name || "Unknown Instructor", // Default to unknown if instructor is missing
      category: course.category,
    }));

    // Send the formatted response
    return NextResponse.json(formattedCourses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
