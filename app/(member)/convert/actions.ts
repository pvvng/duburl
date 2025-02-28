"use server";

import { createActionResult } from "@/lib/create-result-object";
import db from "@/lib/db";
import { memberUrlScema } from "@/lib/zodSchema/url";
import generateShortKey from "@/util/generate-short-key";

export async function memberConvertUrl(_: any, formData: FormData) {
  const data = {
    nickname: formData.get("nickname"),
    url: formData.get("url"),
  };

  const result = memberUrlScema.safeParse(data);

  if (!result.success) {
    return createActionResult({
      success: false,
      fieldErrors: result.error.flatten().fieldErrors,
    });
  }

  // 이미 축약된 같은 url이 존재한다면 반환
  const urlExist = await db.url.findUnique({
    where: { originalUrl: result.data.url },
    select: { shortKey: true, originalUrl: true },
  });

  if (urlExist) {
    return createActionResult({
      success: true,
      result: urlExist,
    });
  }

  let shortKey: string | null = null;
  let isUnique = false;

  while (!isUnique || !shortKey) {
    shortKey = generateShortKey(6);
    const existingKey = await db.url.findUnique({
      where: { shortKey },
      select: { id: true },
    });

    // 중복된 키가 없을 때까지 반복
    if (!existingKey) isUnique = true;
  }

  const shortendURLKey = await db.url.create({
    data: {
      shortKey,
      originalUrl: result.data.url,
    },
    select: { shortKey: true, originalUrl: true },
  });

  return createActionResult({
    success: true,
    result: shortendURLKey,
  });
}
