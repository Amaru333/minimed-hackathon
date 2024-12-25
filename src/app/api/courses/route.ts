/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET() {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch all courses with enrollment counts
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "enrollments", // The collection name for enrollments
          localField: "_id", // Course ID in Course collection
          foreignField: "course", // Course ID in Enrollment collection
          as: "enrollments", // Alias for matched data
        },
      },
      {
        $addFields: {
          enrolledCount: {
            $size: {
              $filter: {
                input: "$enrollments", // Filter the enrollments
                as: "enrollment",
                cond: { $eq: ["$$enrollment.status", "enrolled"] }, // Count only "enrolled" status
              },
            },
          },
        },
      },
      {
        $lookup: {
          from: "instructors", // Instructor collection
          localField: "instructor",
          foreignField: "_id",
          as: "instructor",
        },
      },
      {
        $unwind: {
          path: "$instructor",
          preserveNullAndEmptyArrays: true, // Handle cases where no instructor exists
        },
      },
      {
        $project: {
          id: "$_id",
          title: 1,
          description: 1,
          image: { $ifNull: ["$image", "/extras/course-placeholder.png"] }, // Default image
          duration: 1,
          level: "$skillLevel",
          enrolled: "$enrolledCount", // Enrolled count
          rating: { $ifNull: ["$rating", 0] }, // Default rating to 0
          instructor: { $ifNull: ["$instructor.name", "Unknown Instructor"] },
          category: 1,
        },
      },
    ]);

    // Send the response
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
