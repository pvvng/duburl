import { unstable_cache as nextCache } from "next/cache";
import db from "../db";

export const getCachedUser = nextCache(getUser, ["user"], {
  tags: ["user"],
});

async function getUser(userId: number) {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      avatar: true,
      email: true,
      kakao_id: true,
      google_id: true,
    },
  });

  return user;
}
