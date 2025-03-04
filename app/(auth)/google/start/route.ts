import { redirect } from "next/navigation";

export async function GET() {
  const baseURL = "https://accounts.google.com/o/oauth2/v2/auth";
  const params = {
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: "http://localhost:3000/google/complete",
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  };
  const formattedParams = new URLSearchParams(params).toString();
  const finalURL = `${baseURL}?${formattedParams}`;

  return redirect(finalURL);
}
