import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
}

/** **사용자가 로그인 한 상태인지 확인하는 함수**
 *
 * 반환된 쿠키에 아이디가 존재하면 로그인한 상태
 */
export default async function getSession() {
  return await getIronSession<SessionContent>(await cookies(), {
    cookieName: "werl",
    password: process.env.COOKIE_PASSWORD!,
  });
}
