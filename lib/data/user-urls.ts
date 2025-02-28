import { unstable_cache } from "next/cache";
import db from "../db";

export const getCachedUserUrls = unstable_cache(getUserUrls, ["user-urls"], {
  tags: ["user-urls"],
});

async function getUserUrls(userId: number) {
  const urls = await db.urlNickname.findMany({
    where: { userId },
    include: {
      url: {
        select: {
          originalUrl: true,
          shortKey: true,
        },
      },
    },
    orderBy: { updatedAt: "desc" },
  });

  return urls;
}
