/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb"; // MongoDB connection
import Enrollment from "@/models/Enrollment";

export async function POST(req: NextRequest, context: any) {
  await dbConnect();
  try {
    const { params } = await context;
    const { id } = await params;
    const userId = req.headers.get("x-user-id");

    const existingEnrollment = await Enrollment.findOne({ course: id, user: userId });
    if (existingEnrollment) {
      return NextResponse.json({ message: "Already enrolled" }, { status: 200 });
    }

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
