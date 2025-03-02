import { unstable_cache } from "next/cache";
import db from "../db";
import { Prisma } from "@prisma/client";

export const getCachedUserUrls = unstable_cache(getUserUrls, ["user-urls"], {
  tags: ["user-urls"],
});

export async function getUserUrls(userId: number) {
  const urls = await db.userUrl.findMany({
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

export type UserUrls = Prisma.PromiseReturnType<typeof getUserUrls>;
