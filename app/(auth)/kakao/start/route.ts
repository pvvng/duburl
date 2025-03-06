import { redirect } from "next/navigation";

export async function GET() {
  const baseURL = "https://kauth.kakao.com/oauth/authorize";
  const params = {
    client_id: process.env.KAKAO_REST_API_KEY!,
    response_type: "code",
    redirect_uri: process.env.APP_URL + "/kakao/complete",
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

  return redirect(finalURL);
}
