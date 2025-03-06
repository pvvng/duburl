import db from "@/lib/db";
import { unstable_cache as nextCache } from "next/cache";

export const getCachedUrl = nextCache(getUrl, ["urls"], {
  tags: ["urls"],
});

async function getUrl(shortKey: string) {
  const url = await db.url.findUnique({
    where: { shortKey },
    select: { originalUrl: true },
  });

  return url;
}
