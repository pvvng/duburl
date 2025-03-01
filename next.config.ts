import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img1.kakaocdn.net" },
      { hostname: "t1.kakaocdn.net" },
      { hostname: "imagedelivery.net" },
    ],
  },
  // 외부 api 호출시 logging 실시
  logging: {
    fetches: { fullUrl: true },
  },
  // 빌드 시 ESLint 오류 무시
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
};

export default nextConfig;
