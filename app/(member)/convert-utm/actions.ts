"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { utmSchema } from "@/lib/zodSchema/utm";
import generateShortKey from "@/util/generate-short-key";
import { redirect } from "next/navigation";

export async function createUtm(_: any, formData: FormData) {
  const data = {
    url: formData.get("url"),
    utm_source: formData.get("utm_source"),
    utm_medium: formData.get("utm_medium"),
    utm_campaign: formData.get("utm_campaign"),
    utm_term: formData.get("utm_term"),
    utm_content: formData.get("utm_content"),
    nickname: formData.get("nickname"),
  };

  const result = utmSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  }

  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

  /// shortkey 생성 혹은 검색
  const { id: urlId } = await getUrlId(result.data.url);

  // 이미 완전 동일한 utm이 있는지 확인
  const isExist = await db.utm.findUnique({
    where: {
      urlId_userId_source_medium_campaign: {
        source: result.data.utm_source,
        campaign: result.data.utm_campaign,
        medium: result.data.utm_medium,
        urlId,
        userId: session.id,
      },
    },
    select: { id: true },
  });

  if (isExist) {
    return redirect("/dashboard");
  }

  const term = result.data.utm_term || null;
  const content = result.data.utm_content || null;
  const nickname = result.data.nickname || null;

  const utm = await db.utm.create({
    data: {
      userId: session.id,
      source: result.data.utm_source,
      medium: result.data.utm_medium,
      campaign: result.data.utm_campaign,
      urlId,
      term,
      content,
      nickname,
    },
    select: { id: true },
  });

  return redirect("/dashboard");
}

async function getUrlId(originalUrl: string) {
  // url 찾기
  const urlExist = await db.url.findUnique({
    where: { originalUrl },
    select: { id: true },
  });

  // 있으면 그대로 반환
  if (urlExist) {
    return urlExist;
  }

  // 없으면 short-key 생성
  let shortKey: string;
  let isUnique = false;
  do {
    shortKey = generateShortKey(6);
    const existingKey = await db.url.findUnique({
      where: { shortKey },
      select: { id: true },
    });
    isUnique = !existingKey;
  } while (!isUnique);

  // 생성한 url id 반환
  return await db.url.create({
    data: {
      shortKey,
      originalUrl,
    },
    select: { id: true },
  });
}
