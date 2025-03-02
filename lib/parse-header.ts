interface UserInfoType {
  ip: string;
  language: string;
  platform: string;
  os: string;
  browser: string;
  browserVersion: string;
  device: "mobile" | "tablet" | "desktop";
}

export function parseHeader(headers: Headers): UserInfoType {
  const ip = headers.get("x-forwarded-for")?.split(",")[0] || ""; // 첫 번째 IP 추출
  const language = headers.get("accept-language")?.split(",")[0] || ""; // 첫 번째 언어 추출
  const userAgent = headers.get("user-agent") || ""; // user-agent 추출

  const platform =
    /Mac|Windows|Linux|iPhone|iPad|Android/
      .exec(userAgent ?? "")?.[0]
      .toLowerCase() || "";

  // 모바일 여부 확인 (sec-ch-ua-mobile이 없을 경우 User-Agent로 확인)
  let isMobile = headers.get("sec-ch-ua-mobile") === "?1";
  if (!isMobile) isMobile = /iPhone|Android/.test(userAgent ?? "");

  const osRegex = /\(([^)]+)\)/; // 운영 체제 정보 추출
  const browserRegex =
    /(Chrome|Firefox|Safari|Edge|Opera)\/([0-9]+(\.[0-9]+)*)/; // 브라우저 정보 추출
  const tabletRegex = /Tablet|iPad/; // 태블릿 장치 확인

  const osMatch = userAgent?.match(osRegex) || "";
  const browserMatch = userAgent?.match(browserRegex) || "";

  const isTablet = tabletRegex?.test(userAgent || ""); // 태블릿 장치 여부 확인

  let device: "mobile" | "tablet" | "desktop" = "desktop";
  if (isMobile) device = "mobile"; // 모바일 장치일 경우
  else if (isTablet) device = "tablet"; // 태블릿 장치일 경우
  else device = "desktop"; // 그 외는 데스크탑으로 설정

  const os = osMatch ? osMatch[1].toLowerCase() : "";
  const browser = browserMatch ? browserMatch[1].toLowerCase() : "";
  const browserVersion = browserMatch ? browserMatch[2].toLowerCase() : "";

  return {
    ip,
    language,
    platform,
    os,
    browser,
    browserVersion,
    device,
  };
}
