import { getCachedUserUrls } from "@/lib/data/user-urls";
import getSession from "@/lib/session";
import { LinkIcon } from "@heroicons/react/24/outline";
import UrlCard from "@/components/url-card";
import { redirect } from "next/navigation";
import { SearchForm } from "./form/search-form";

export async function UserUrls({ search }: { search: string }) {
  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

  // searchParams로 검색어 포항해서 검색하기
  const urls = await getCachedUserUrls(session.id, search);

  return (
    <div className="flex flex-col gap-5 white-card dark:dark-card">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <LinkIcon className="size-6" />
        <span>내 URL</span>
      </div>
      <SearchForm search={search} />
      {urls.length === 0 && <p>변환한 URL이 없습니다.</p>}
      {urls.map((userUrl) => (
        <UrlCard
          key={userUrl.urlId}
          urlId={userUrl.urlId}
          nickname={userUrl.nickname}
          shortKey={userUrl.url.shortKey}
          originalUrl={userUrl.url.originalUrl}
          type="member"
        />
      ))}
    </div>
  );
}
