import { NextResponse } from "next/server";

// 예시로 사용하는 도메인, 실제 도메인으로 변경하세요.
const BASE_URL = process.env.APP_URL!;

export async function GET() {
  // 사이트의 동적 라우팅 데이터를 가져오는 예시
  // API 호출이나 DB 조회로 대체 가능
  const dynamicPaths = [, "/home", "/profile"];

  // 현재 시간 기준으로 Last Modified 날짜 설정
  const lastModified = new Date().toISOString().split("T")[0];

  // 사이트맵 XML 생성
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${BASE_URL}</loc>
      <lastmod>${lastModified}</lastmod>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>${BASE_URL}/home</loc>
      <lastmod>${lastModified}/home</lastmod>
      <priority>1.0</priority>  
    </url>
    <url>
      <loc>${BASE_URL}/profile</loc>
      <lastmod>${lastModified}</lastmod>
      <priority>0.8</priority> 
    </url>
    <url>
      <loc>${BASE_URL}/privacy-policy</loc>
      <lastmod>${lastModified}</lastmod>
      <priority>0.6</priority>
    </url>
    <url>
      <loc>${BASE_URL}/login</loc>
      <lastmod>${lastModified}</lastmod>
      <priority>0.5</priority>
    </url>
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
