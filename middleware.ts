import { clerkMiddleware } from "@clerk/nextjs/server";

// Export the Clerk middleware without any customization
export default clerkMiddleware();

// Only run the middleware on specific paths
export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.ico).*)"],
};
