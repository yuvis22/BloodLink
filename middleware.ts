// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/find-donor",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhook/clerk",
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is public, allow access
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Check if user is authenticated
  const { userId, redirectToSignIn } = await auth();

  // If not authenticated and trying to access a protected route, redirect to sign-in
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // User is authenticated, allow access to protected route
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/image|_next/static|favicon.ico).*)",
  ],
};
