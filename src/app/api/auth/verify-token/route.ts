import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import Log from "@/models/Log";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const userID = decoded as { userId: string };

    const log = new Log({ user: userID.userId });
    await log.save();

    const user = await User.findById(userID.userId).select("-password");

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 401 });
  }
}
