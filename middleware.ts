import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Only protect /dashboard/chat routes
      if (req.nextUrl.pathname.startsWith('/dashboard/chat')) {
        return !!token;
      }
      // Allow all other routes
      return true;
    },
  },
});

export const config = {
  matcher: ['/dashboard/chat/:path*'],
};
