import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const protectedRoutes = ["/home", "/settings", "/poll"];

  const token = req.cookies.get("token")?.value;
  if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
