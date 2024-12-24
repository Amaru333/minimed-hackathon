import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Log from "@/models/Log";

// GET Handler
export async function GET(req: NextRequest) {
  try {
    // Connect to MongoDB
    await dbConnect();

    // Validate user ID
    const userId = req.headers.get("x-user-id");

    // Fetch logs for the user, sorted by createdAt in descending order
    const logs = await Log.find({ user: userId })
      .sort({ createdAt: -1 }) // Sort logs by date descending
      .select("createdAt")
      .lean();

    // If no logs, return streak as 0
    if (!logs || logs.length === 0) {
      return NextResponse.json({ streak: 0, lastLogin: null }, { status: 200 });
    }

    // Process logs to calculate streak based on DATE (ignoring time)
    let streak = 1; // Start streak at 1 since last login always counts
    const lastLogin = logs[0].createdAt;

    // Get the date portion only (year, month, day) for comparison
    const getDateOnly = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    };

    // Start with the first date
    let prevDate = getDateOnly(new Date(logs[0].createdAt));

    for (let i = 1; i < logs.length; i++) {
      const currentDate = getDateOnly(new Date(logs[i].createdAt));

      // Calculate the difference in days
      const diffDays = (prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        // Consecutive day
        streak++;
      } else if (diffDays > 1) {
        // Break the streak if the days are not consecutive
        break;
      }

      // Update previous date to current date
      prevDate = currentDate;
    }

    // Return response
    return NextResponse.json({ streak, lastLogin }, { status: 200 });
  } catch (error) {
    console.error("Error fetching login streak:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
