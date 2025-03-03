import db from "@/lib/db";
import getSession from "@/lib/session";
import { StarIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect } from "next/navigation";

async function getUserUrls(userId: number) {
  const userUrls = await db.userUrl.findMany({
    where: { userId },
    select: {
      id: true,
      nickname: true,
      url: {
        select: {
          id: true,
          originalUrl: true,
          shortKey: true,
        },
      },
    },
  });

  return userUrls;
}

export default async function DashBoard() {
  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

  const userUrls = await getUserUrls(session.id);

  console.log(userUrls);

  return (
    <div className="p-5 xl:p-16">
      <h1 className="font-semibold text-2xl mb-3">내 대시보드</h1>
      <div className="flex flex-col md:flex-row gap-5 items-center">
        {userUrls.map((userUrl) => (
          <div
            key={userUrl.id}
            className="xl:w-1/3 md:w-1/2 w-full white-card flex flex-col gap-5"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-1 items-end">
                <p className="text-xl font-semibold">
                  {userUrl.nickname || userUrl.url.shortKey}
                </p>
                <p className="text-sm text-neutral-600">
                  #{userUrl.url.shortKey}
                </p>
              </div>
              <StarIcon className="size-5" />
            </div>
            <Link
              href={`/dashboard/${userUrl.id}`}
              className="bg-neutral-200 rounded-xl shadow-md p-2 px-3 font-medium text-center
            transition-colors hover:bg-neutral-300"
            >
              대시보드 확인
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <p>{getFormattedUTM({ ...utm, userUrlId: userUrl.id })}</p> */
}
