import db from "@/lib/db";
import LogUserIn from "@/lib/login";
import { safeJson } from "@/lib/safe-json";
import generateShortKey from "@/util/generate-short-key";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  // 에러 처리 (bad requset)
  if (!code) {
    return new Response(null, { status: 400 });
  }

  const { error, access_token } = await getAccessToken(code);

  // 에러 처리 (bad requset)
  if (error || !access_token) {
    return new Response(null, { status: 400 });
  }

  const {
    sub: google_id,
    name: username,
    email,
    picture: avatar,
  } = await getUserProfile(access_token);

  const user = await db.user.findUnique({
    where: { google_id },
    select: { id: true },
  });

  // 이미 존재하는 사용자는 세션만 저장하고 리다이렉트
  if (user) {
    await LogUserIn(user.id);
    return redirect("/profile");
  }

  // 이름 및 이메일이 동일한 사용자가 있는지 확인
  const nameExist = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });

  let emailExist: { id: number } | null = null;
  if (email) {
    emailExist = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
  }

  const newUser = await db.user.create({
    data: {
      // 같은 이름을 가진 사용자가 존재한다면 이름 뒤에 8자리 난수 생성
      username: username + (nameExist ? generateShortKey(8) : ""),
      // 같은 이메일을 가진 사용자가 존재한다면 email field null로
      email: !emailExist ? email : null,
      avatar,
      google_id,
    },
    select: { id: true },
  });

  // 사용자 로그인 시키기
  await LogUserIn(newUser.id);

  // 리다이렉트
  return redirect("/profile");
}

interface AccessTokenRespose {
  error: string | undefined;
  access_token: string | undefined;
  // jwt
  id_token: string | undefined;
}

// access token fetch
async function getAccessToken(code: string) {
  // 다음 params를 준비해서
  const accessTokenParams = createAccessTokenParams(code);

  const baseURL = "https://oauth2.googleapis.com/token";
  // access token 받기 위해 POST req 보내기
  const accessTokenUrl = `${baseURL}?${accessTokenParams}`;

  // header 넣어서 받을 데이터 타입 (json/xml) 정하기
  const accessTokenResponse = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  return safeJson<AccessTokenRespose>(accessTokenResponse);
}

// access token params 생성하는 함수
function createAccessTokenParams(code: string) {
  // 다음 params를 준비해서
  return new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.APP_URL + "/google/complete",
    code,
    client_secret: process.env.GOOGLE_CLIENT_SECRET!,
  }).toString();
}

interface GoogleUser {
  sub: string;
  name: string;
  picture: string;
  email: string;
}

// 사용자 프로필 불러오는 함수
async function getUserProfile(access_token: string) {
  const url = "https://www.googleapis.com/oauth2/v3/userinfo";

  const userProfileResponse = await fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    cache: "no-cache",
  });

  return await safeJson<GoogleUser>(userProfileResponse);
}
