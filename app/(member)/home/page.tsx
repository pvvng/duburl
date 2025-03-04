import MemberConvertUrlForm from "@/components/form/member-convert-url-form";
import { getCachedUserUrls } from "@/lib/data/user-urls";
import getSession from "@/lib/session";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import { UserUrlsLoading } from "./loading";
import UrlCard from "@/components/url-card";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16">
      <div className="flex md:flex-row flex-col gap-5">
        <div className="md:w-1/3">
          <MemberConvertUrlForm />
        </div>
        <div className="md:w-2/3">
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
    <div className="flex flex-col gap-5 white-card">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <LinkIcon className="size-6" />
        <span>내 URL</span>
      </div>
      {urls.length === 0 && <p>변환한 URL이 없습니다.</p>}
      {urls.map((userUrl) => (
        <UrlCard
          key={userUrl.urlId}
          urlId={userUrl.urlId}
          nickname={userUrl.nickname}
          shortKey={userUrl.url.shortKey}
          originalUrl={userUrl.url.originalUrl}
        />
      ))}
    </div>
  );
}
