import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(
  (req: NextRequest & { auth: { user?: { role?: string } } | null }) => {
    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
    const isLoginPage = req.nextUrl.pathname === "/admin/login";

    if (isAdminRoute && !isLoginPage) {
      if (!req.auth?.user) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    return NextResponse.next();
  },
);

export const config = {
  matcher: ["/admin/:path*"],
};
