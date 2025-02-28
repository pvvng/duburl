"use server";

import { createActionResult } from "@/lib/create-result-object";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { memberUrlScema, nicknameScehma } from "@/lib/zodSchema/url";
import generateShortKey from "@/util/generate-short-key";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function memberConvertUrl(_: any, formData: FormData) {
  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

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
    select: { id: true, shortKey: true, originalUrl: true },
  });

  if (urlExist) {
    const urlNickname = await db.urlNickname.upsert({
      where: {
        userId_urlId: {
          userId: session.id,
          urlId: urlExist.id,
        },
      },
      update: {
        nickname:
          result.data.nickname.trim() === "" ? null : result.data.nickname,
      },
      create: {
        userId: session.id,
        urlId: urlExist.id,
        nickname:
          result.data.nickname.trim() === "" ? null : result.data.nickname,
      },
      select: { nickname: true },
    });

    revalidateTag("user-urls");

    return createActionResult({
      success: true,
      result: { ...urlExist, nickname: urlNickname.nickname },
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
      originalUrl: result.data.url,
    },
    select: { id: true, shortKey: true, originalUrl: true },
  });

  const urlNickname = await db.urlNickname.upsert({
    where: {
      userId_urlId: {
        userId: session.id,
        urlId: shortendURLKey.id,
      },
    },
    update: {
      nickname:
        result.data.nickname.trim() === "" ? null : result.data.nickname,
    },
    create: {
      userId: session.id,
      urlId: shortendURLKey.id,
      nickname:
        result.data.nickname.trim() === "" ? null : result.data.nickname,
    },
    select: { nickname: true },
  });

  revalidateTag("user-urls");

  return createActionResult({
    success: true,
    result: { ...shortendURLKey, nickname: urlNickname.nickname },
  });
}

export async function deleteUrl(urlId: number) {
  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

  await db.urlNickname.delete({
    where: {
      userId_urlId: {
        userId: session.id,
        urlId,
      },
    },
  });

  revalidateTag("user-urls");
}

export async function updateUrl(urlId: number, nickname: string | null) {
  const session = await getSession();

  if (!session || !session.id) {
    return redirect("/");
  }

  const result = nicknameScehma.safeParse(nickname);

  if (!result.success) {
    return result.error.flatten().formErrors;
  }

  await db.urlNickname.update({
    where: {
      userId_urlId: {
        userId: session.id,
        urlId,
      },
    },
    data: { nickname: result.data === "" ? null : result.data },
  });

  revalidateTag("user-urls");
}
