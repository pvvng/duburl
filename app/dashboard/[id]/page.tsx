import db from "@/lib/db";
import getSession from "@/lib/session";
import { getFormattedUTM } from "@/util/format-utm-params";
import { notFound } from "next/navigation";
import { DevicePieChart } from "./test";
import { getFormattedTracking } from "@/util/format-tracking";

interface DashBoardProps {
  params: Promise<{ id: string }>;
}

async function getUserUrlData(id: number, userId: number) {
  const urlData = await db.userUrl.findUnique({
    where: { id, userId },
    select: {
      nickname: true,
      url: {
        select: {
          originalUrl: true,
          shortKey: true,
        },
      },
      utms: {
        select: {
          id: true,
          source: true,
          medium: true,
          campaign: true,
          term: true,
          content: true,
          nickname: true,
          tracking: true,
        },
      },
    },
  });

  return urlData;
}

export default async function DetailDashBoard({ params }: DashBoardProps) {
  const id = Number((await params).id);

  if (isNaN(id) || !id) {
    return notFound();
  }
  const session = await getSession();

  if (!session || !session.id) {
    return notFound();
  }

  const urlData = await getUserUrlData(id, session.id);
  if (!urlData) {
    return notFound();
  }

  const { url, utms, nickname } = urlData;

  return (
    <div className="p-5">
      <h1 className="text-2xl">{nickname || url.shortKey}</h1>
      <p>{url.originalUrl}</p>
      <p>{url.shortKey}</p>
      <hr />
      {utms.map((utm) => {
        const { tracking, nickname, id, ...params } = utm;
        const { browserData, deviceData, languageData, osData, platformData } =
          getFormattedTracking(tracking);
        return (
          <div key={id}>
            <p>{nickname}</p>
            <p>
              {url.shortKey}?{getFormattedUTM({ ...params, userUrlId: id })}
            </p>
            <DevicePieChart deviceData={deviceData} />
          </div>
        );
      })}
    </div>
  );
}
