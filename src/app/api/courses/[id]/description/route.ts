/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/lib/mongodb"; // MongoDB connection
import Course from "@/models/Course";
import Instructor from "@/models/Instructor";

// Connect to the database
await dbConnect();

export async function GET(req: NextRequest, context: any) {
  try {
    // Connect to the database
    await dbConnect();

    // Extract ID from params
    const { params } = await context;
    const { id } = await params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid course ID" }, { status: 400 });
    }

    // Fetch course and instructor details
    const course = await Course.findById(id).populate({
      path: "instructor",
      model: Instructor,
    });

    // Handle course not found
    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Format the response as per requirements
    const formattedResponse = {
      id: course._id.toString(),
      title: course.title,
      description: course.description,
      instructor: {
        name: course.instructor.name,
        title: "Emergency Medicine Specialist", // Placeholder title, update if dynamic
        image: course.instructor.image || "https://github.com/shadcn.png", // Use placeholder if image is missing
        courses: 12, // Placeholder, replace with dynamic count if needed
        students: 3420, // Placeholder, replace dynamically if data is available
        rating: 4.9, // Placeholder, replace dynamically if data is available
      },
      stats: {
        enrolled: course.enrolled,
        duration: course.duration,
        lectures: 24, // Placeholder, replace dynamically if needed
        level: course.skillLevel,
      },
      rating: {
        average: course.rating,
        count: 856, // Placeholder, replace dynamically if needed
      },
      topics: course.topics, // Use topics directly from DB
      features: course.features, // Use features directly from DB
      image: course.image || "/extras/course-placeholder.png", // Default image placeholder
    };

    // Return the response
    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
