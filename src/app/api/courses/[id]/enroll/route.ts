/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection
import Enrollment from "@/models/Enrollment";

// {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: User,
//       required: [true, "Please provide a user"],
//     },
//     course: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: Course,
//       required: [true, "Please provide a course"],
//     },
//     status: {
//       type: String,
//       enum: ["enrolled", "completed"],
//       default: "enrolled",
//     },
//     enrolledOn: {
//       type: Date,
//       default: Date.now,
//     },
//     completedOn: {
//       type: Date,
//     },
//   },
// Connect to the database

export async function POST(req: NextRequest, context: any) {
  await dbConnect();
  try {
    const { params } = await context;
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    const newEnrollment = new Enrollment({
      user: userId,
      course: id,
    });

    await newEnrollment.save();

    // Return the response
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching course description:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
