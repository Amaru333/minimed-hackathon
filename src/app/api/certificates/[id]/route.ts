/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import Certificate from "@/models/Certificate";
import dbConnect from "@/lib/mongodb";
export async function GET(req: NextRequest, context: any) {
  const { params } = await context;
  const { id } = await params;
  try {
    await dbConnect();
    const results = await Certificate.findById(id)
      .populate("user", "name")
      .populate("course", "title slug");
    if (!results) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }
    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
