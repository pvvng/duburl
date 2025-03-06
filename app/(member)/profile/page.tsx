import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { UserUrls } from "@/components/member-urls";
import { UserUrlsLoading } from "@/components/member-urls-loading";
import { getCachedUser } from "@/lib/data/user";
import { revalidateTag } from "next/cache";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Profile({ searchParams }: PageProps) {
  const search = (await searchParams).search || "";

  const session = await getSession();

  if (!session || !session.id) notFound();

  const user = await getCachedUser(session.id);

  if (!user) notFound();

  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    revalidateTag("user");
    redirect("/");
  };

  return (
    <div className="p-5 xl:p-16 flex md:flex-row flex-col gap-5">
      <div className="md:w-1/3">
        <div className="white-card dark:dark-card">
          <div
            className="size-32 border-2 border-white rounded-full overflow-hidden relative mx-auto
           dark:border-neutral-400 dark:bg-neutral-400 bg-neutral-200"
          >
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.username}
                fill
                sizes="36"
                priority
                className="object-cover"
              />
            ) : (
              <UserIcon className="text-white" />
            )}
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm text-gray-600">이름</p>
              <p className="font-semibold text-xl">{user.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">이메일</p>
              <p className="text-xl">
                {user.email ? user.email : "확인되지 않음"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">연동된 SNS</p>
              <div className="rounded-full relative size-6 overflow-hidden mt-2">
                {user.kakao_id && (
                  <Image
                    src="kakao-icon.svg"
                    alt="카카오톡"
                    fill
                    className="object-cover"
                  />
                )}
                {user.google_id && (
                  <Image
                    src="google-icon.svg"
                    alt="구글"
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            </div>
            <form action={logout}>
              <button
                className="mt-5 w-full border-2 border-red-500 rounded-lg text-red-500 
            hover:bg-red-500 hover:text-white p-2 px-3 transition-colors font-semibold"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="md:w-2/3">
        <Suspense fallback={<UserUrlsLoading />}>
          <UserUrls search={search} />
        </Suspense>
      </div>
    </div>
  );
}
