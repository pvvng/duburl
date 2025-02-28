import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

const publicOnlyURL = new Set([
  "/",
  "/login",
  "/kakao/start",
  "/kakao/complete",
]);

export async function middleware(req: NextRequest) {
  const isPublicPath = publicOnlyURL.has(req.nextUrl.pathname);
  const isLoggedIn = Boolean((await getSession()).id);

  // // 로그아웃 상태
  // // private page 이동 시도
  // if (!isLoggedIn && !isPublicPath) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // // 로그인 상태
  // // public page 이동 시도
  // if (isLoggedIn && isPublicPath) {
  //   return NextResponse.redirect(new URL("/home", req.url));
  // }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
