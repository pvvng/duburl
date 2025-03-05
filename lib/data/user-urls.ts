import { unstable_cache as nextCache } from "next/cache";
import db from "../db";
import { Prisma } from "@prisma/client";

export const getCachedUserUrls = (userId: number, search: string) => {
  const cachedOperation = nextCache(getUserUrls, ["user-urls"], {
    tags: ["user-urls"],
  });
  return cachedOperation(userId, search);
};

export async function getUserUrls(userId: number, search: string) {
  const urls = await db.userUrl.findMany({
    where: {
      userId,
      nickname: {
        contains: search,
      },
    },
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
