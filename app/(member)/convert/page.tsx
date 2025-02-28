import MemberConvertUrlForm from "@/components/member-convert-url-form";
import { getCachedUserUrls } from "@/lib/data/user-urls";
import getSession from "@/lib/session";
import { LinkIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { UserUrlsLoading } from "./loading";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16">
      <div className="flex gap-5 p-5">
        <div className="w-1/3 flex flex-col gap-5">
          <MemberConvertUrlForm />
          <div className="white-card">
            <div className="flex gap-2 items-center text-xl font-semibold ">
              <ListBulletIcon className="size-6" />
              <span>다른 URL 둘러보기</span>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <Suspense fallback={<UserUrlsLoading />}>
            <UserUrls />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

async function UserUrls() {
  const session = await getSession();
  const urls = await getCachedUserUrls(session.id!);

  return (
    <div className="flex flex-col gap-3 white-card">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <LinkIcon className="size-6" />
        <span>내 URL</span>
      </div>
      {urls.map((userUrl) => (
        <div
          key={userUrl.urlId}
          className="*:break-words flex flex-col gap-1 white-card bg-neutral-50"
        >
          <p>{userUrl.nickname ?? "별명 없음"}</p>
          <p>{userUrl.url.originalUrl}</p>
          <p>{userUrl.url.shortKey}</p>
          <p>{userUrl.updatedAt.toString()}</p>
        </div>
      ))}
    </div>
  );
}
