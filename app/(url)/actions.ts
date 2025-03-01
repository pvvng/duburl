"use server";

import { createActionResult } from "@/lib/create-result-object";
import db from "@/lib/db";
import { urlSchema } from "@/lib/zodSchema/url";
import generateShortKey from "@/util/generate-short-key";

export async function convertUrl(_: any, formData: FormData) {
  const data = formData.get("url");

  const result = urlSchema.safeParse(data);

  if (!result.success) {
    return createActionResult({
      success: false,
      formErrors: result.error.flatten().formErrors,
    });
  }

  // 이미 축약된 같은 url이 존재한다면 반환
  const urlExist = await db.url.findUnique({
    where: { originalUrl: result.data },
    select: { shortKey: true, originalUrl: true },
  });

  if (urlExist) {
    return createActionResult({
      success: true,
      result: urlExist,
    });
  }

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

  const shortendURLKey = await db.url.create({
    data: {
      shortKey,
      originalUrl: result.data,
    },
    select: { shortKey: true, originalUrl: true },
  });

  return createActionResult({
    success: true,
    result: shortendURLKey,
  });
}
