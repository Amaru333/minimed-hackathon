import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  // Get the Authorization header
  const authHeader = request.headers.get("authorization");

  // Check if the Authorization header is missing or invalid
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1]; // Extract token

  try {
    // Verify the token
    const decoded = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));

    // Attach user data to request by cloning headers with user data
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", (decoded.payload as { userId: string }).userId); // Attach userId

    // Proceed to the next middleware or route
    return NextResponse.next({
      request: { headers: requestHeaders }, // Pass updated headers
    });
  } catch {
    return NextResponse.json({ message: "Invalid or expired token middleware" }, { status: 401 });
  }
}

// Apply middleware only to protected routes
export const config = {
  matcher: [
    "/api/courses/:path*",
    "/api/quiz/:path*",
    "/api/activity/:path*",
    "/api/certificates/:path*",
    "/api/profile/:path*",
  ], // Match routes starting with /api/protected/
};
