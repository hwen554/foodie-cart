import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],  // Make the root route accessible to both signed in and signed out users
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)", // Ensure API routes and static files are not intercepted by Clerk
    
    "/(api|trpc)(.*)",  // API routes
  ],
};
