import MemberConvertUrlForm from "@/components/member-convert-url-form";
import { getCachedUserUrls } from "@/lib/data/user-urls";
import getSession from "@/lib/session";
import { Suspense } from "react";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16">
      <div className="max-w-screen-sm mx-auto flex flex-col justify-center gap-10 p-5">
        <h1 className="text-2xl font-semibold">✂ 긴 URL 짧게 변환하기</h1>
        <MemberConvertUrlForm />
        <Suspense fallback={"loading..."}>
          <UserUrls />
        </Suspense>
      </div>
    </div>
  );
}

async function UserUrls() {
  const session = await getSession();
  const urls = await getCachedUserUrls(session.id!);

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xl font-semibold">내 URL</p>
      <div className="border border-b-neutral-200" />
      {urls.map((userUrl) => (
        <div
          key={userUrl.urlId}
          className="*:break-words flex flex-col gap-1 bg-white rounded-md p-5 shadow-md"
        >
          <p>{userUrl.nickname ?? "별명 없음"}</p>
          <p>{userUrl.url.originalUrl}</p>
          <p>{userUrl.url.shortKey}</p>
          <p>{userUrl.createdAt.toString()}</p>
        </div>
      ))}
    </div>
  );
}
