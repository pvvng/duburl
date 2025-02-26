"use server";

import { createActionResult } from "@/lib/create-result-object";
import db from "@/lib/db";
import { urlSchema } from "@/lib/zodSchema/url";
import generateShortKey from "@/util/short-key/generate-short-key";

export async function convertUrl(_: any, formData: FormData) {
  const data = formData.get("url");

  const result = urlSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.flatten().formErrors;
    return createActionResult(false, undefined, errors);
  }

  // 이미 축약된 같은 url이 존재한다면 반환
  const urlExist = await db.url.findUnique({
    where: { originalUrl: result.data },
    select: { id: true, shortKey: true },
  });

  if (urlExist) {
    return createActionResult(true, urlExist, undefined);
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
      originalUrl: result.data,
    },
    select: { id: true, shortKey: true },
  });

  return createActionResult(true, shortendURLKey, undefined);
}
