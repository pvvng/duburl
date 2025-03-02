import db from "@/lib/db";
import getSession from "@/lib/session";
import { getFormattedUTM } from "@/util/format-utm-params";
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
      utms: {
        select: {
          id: true,
          nickname: true,
          medium: true,
          source: true,
          campaign: true,
          term: true,
          content: true,
          baseUrl: true,
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

  return (
    <div className="p-5 xl:p-16 flex flex-col gap-5 items-center">
      {userUrls.map((userUrl) => (
        <div key={userUrl.id} className="w-full white-card">
          <p>{userUrl.nickname || userUrl.url.shortKey}</p>
          <p>{userUrl.url.shortKey}</p>
          <p>{userUrl.url.originalUrl}</p>
          <hr />
          <p>UTM</p>
          {userUrl.utms.map((utm) => {
            return (
              <div key={utm.id}>
                <p>{utm.nickname || "별명없음"}</p>
                <p>
                  {userUrl.url.shortKey}?{getFormattedUTM({ ...utm })}
                </p>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
