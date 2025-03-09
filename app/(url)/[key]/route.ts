import { getCachedUrl } from "@/lib/data/urls";
import { NextRequest } from "next/server";

/** 축약된 url로 사용자 리디렉트 */
export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const shortKey = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  const url = await getCachedUrl(shortKey);

  if (!url) {
    return new Response(null, { status: 404 });
  }

  return Response.redirect(url.originalUrl, 302);
}
