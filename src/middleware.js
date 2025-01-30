import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Get user from token
    const user = req.nextauth.token?.user;
    const isAdmin = req.nextauth.token?.role === 'admin';
    const path = req.nextUrl.pathname;

    // Protect admin routes
    if (path.startsWith('/admin')) {
      if (!isAdmin) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Allow access to other protected routes
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// Specify which routes to protect
export const config = {
  matcher: [
    '/admin/:path*',  // Protect all admin routes
    '/orders',        // Protect orders page
    '/cart',          // Protect cart page
  ],
};