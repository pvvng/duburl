import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

const privateURL = new Set(["/home", "/profile"]);
const publicURL = new Set([
  "/",
  "/login",
  "/kakao/start",
  "/kakao/complete",
  "/google/start",
  "/google/complete",
]);

export async function middleware(req: NextRequest) {
  const isPrivatePath = privateURL.has(req.nextUrl.pathname);
  const isPublicPath = publicURL.has(req.nextUrl.pathname);
  const isLoggedIn = Boolean((await getSession()).id);

  if (!isLoggedIn && isPrivatePath) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
