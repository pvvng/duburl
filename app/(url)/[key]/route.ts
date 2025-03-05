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

  // uid (userUrlId) params에서 찾기
  const userUrlId = Number(req.nextUrl.searchParams.get("uid") || "not-found");

  // userUrlId가 정확하지 않거나 없으면 트래킹하지 않고 redirect
  if (!userUrlId || isNaN(userUrlId)) {
    return Response.redirect(url.originalUrl, 302);
  }

  // utm 객체 생성
  const utmObject = {
    source: req.nextUrl.searchParams.get("source") ?? "",
    medium: req.nextUrl.searchParams.get("medium") ?? "",
    campaign: req.nextUrl.searchParams.get("campaign") ?? "",
    term: req.nextUrl.searchParams.get("term") ?? "",
    content: req.nextUrl.searchParams.get("content") ?? "",
  };

  // 적어도 하나의 값이 빈 문자열이 아니면 true
  const hasUtmParams = Object.values(utmObject).some((value) => value !== "");

  // utm params 존재하지 않는다면 redirect
  if (!hasUtmParams) {
    return Response.redirect(url.originalUrl, 302);
  }

  const utm = await db.utm.findUnique({
    where: {
      userUrlId_source_medium_campaign_term_content: {
        userUrlId,
        ...utmObject,
      },
    },
    select: { id: true },
  });

  // 해당 utm으로 생성된 utm이 없으면 리다이렉트
  if (!utm) {
    return Response.redirect(url.originalUrl, 302);
  }

  // 정보 파싱
  const userInfo = parseHeader(req.headers);

  // 트래킹 정보 저장
  await db.utmTracking.create({
    data: {
      utmId: utm.id,
      ...userInfo,
    },
  });

  return Response.redirect(url.originalUrl, 302);
}
