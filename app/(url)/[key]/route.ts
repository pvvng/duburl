import db from "@/lib/db";
import { parseHeader } from "@/lib/parse-header";
import { NextRequest } from "next/server";

/** 축약된 url로 사용자 리디렉트 */
export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const shortKey = pathname.startsWith("/") ? pathname.slice(1) : pathname;

  const url = await db.url.findUnique({
    where: { shortKey },
    select: { originalUrl: true },
  });

  if (!url) {
    return new Response(null, { status: 404 });
  }

  const baseUrl = url.originalUrl;
  const utmObject = {
    source: req.nextUrl.searchParams.get("source") ?? "",
    medium: req.nextUrl.searchParams.get("medium") ?? "",
    campaign: req.nextUrl.searchParams.get("campaign") ?? "",
    term: req.nextUrl.searchParams.get("term") ?? "",
    content: req.nextUrl.searchParams.get("content") ?? "",
  };

  // 적어도 하나의 값이 빈 문자열이 아니면 true
  const hasUtmParams = Object.values(utmObject).some((value) => value !== "");

  if (hasUtmParams) {
    const utm = await db.utm.findUnique({
      where: {
        baseUrl_source_medium_campaign_term_content: {
          baseUrl,
          ...utmObject,
        },
      },
      select: { id: true },
    });

    // 해당 주소로 생성된 utm이 없으면 리다이렉트
    if (!utm) {
      return Response.redirect(url.originalUrl, 302);
    }

    // 정보 파싱
    const userInfo = parseHeader(req.headers);

    // 정보 저장
    await db.utmTracking.create({
      data: {
        utmId: utm.id,
        ...userInfo,
      },
    });
  }

  return Response.redirect(url.originalUrl, 302);
}
