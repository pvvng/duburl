"use client";

import { deleteUrl, updateUrl } from "@/app/(member)/convert-url/actions";
import { copyToClipboard } from "@/util/copy-to-clipboard";
import {
  DocumentCheckIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface Props {
  nickname?: string | null;
  urlId?: number;
  shortKey: string;
  originalUrl: string;
}

export default function UrlCard({
  urlId,
  nickname,
  shortKey,
  originalUrl,
}: Props) {
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const nicknameRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const currentUrl = window.location.origin;
    setWebsiteUrl(currentUrl);
  }, []);

  const handleCopy = async (text: string) => {
    const result = await copyToClipboard(text);
    if (result.success) {
      setMessageVisible(true);

      // 이전 타이머가 있으면 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 새로운 타이머 설정
      timeoutRef.current = setTimeout(() => {
        setMessageVisible(false);
      }, 800);
    }
  };

  const handleDelete = async () => {
    const result = confirm(
      `URL 삭제시 관련된 모든 UTM이 삭제됩니다.\n${originalUrl} (${
        nickname ? nickname : shortKey
      }) 을 정말 삭제하시겠습니까?`
    );

    if (result && urlId) {
      await deleteUrl(urlId);
    }
  };

  const handleUpdate = async () => {
    const newNickname = nicknameRef.current?.value;
    if (newNickname === undefined) {
      return;
    }
    if (newNickname === nickname) {
      setEditVisible(false);
      return;
    }

    const errors = await updateUrl(urlId!, newNickname);

    if (errors) {
      alert(errors.join("\n"));
    } else {
      setEditVisible(false);
    }
  };

  return (
    <>
      {messageVisible && (
        <div
          className="fixed bottom-1/2 left-1/2 animate-moveUp font-semibold
        flex gap-2 bg-green-500 text-white p-3 px-5 rounded-xl text-center"
        >
          <InformationCircleIcon className="size-6" />
          <p>복사 성공!</p>
        </div>
      )}
      <div className="flex flex-col rounded-xl bg-neutral-200 shadow-md">
        {nickname !== undefined &&
          (editVisible ? (
            <form
              action={handleUpdate}
              className="p-2 px-3 flex justify-between items-center"
            >
              <input
                name="nickname"
                placeholder="변경할 별명을 입력하세요."
                defaultValue={nickname ?? ""}
                ref={nicknameRef}
                maxLength={20}
                className="h-6 border-none rounded-xl focus:outline-none placeholder:text-neutral-400 
                ring-1 ring-neutral-200 focus:ring-2 focus:ring-neutral-400"
              />
              <div className="flex gap-2 *:size-5">
                <button
                  aria-label="save"
                  className="hover:text-green-500 transition-colors"
                >
                  <DocumentCheckIcon />
                </button>
                <span
                  aria-label="close"
                  className="cursor-pointer hover:text-red-400 transition-colors"
                  onClick={() => setEditVisible((pre) => !pre)}
                >
                  <XMarkIcon />
                </span>
              </div>
            </form>
          ) : (
            <div className="p-2 px-3 flex justify-between items-center">
              <p className="font-semibold">{nickname ? nickname : shortKey}</p>
              <div className="flex gap-2 *:size-5">
                <button
                  aria-label="edit"
                  onClick={() => setEditVisible((pre) => !pre)}
                >
                  <PencilSquareIcon className="transition-colors hover:text-neutral-500" />
                </button>
                <button aria-label="delete" onClick={handleDelete}>
                  <TrashIcon className="text-red-600 transition-colors hover:text-red-400" />
                </button>
              </div>
            </div>
          ))}
        {nickname !== undefined && <div className="border-b-2 border-white" />}
        <div
          className="group cursor-pointer p-2 px-3 truncate"
          onClick={() => handleCopy(originalUrl)}
        >
          <span className="font-medium">단축전: </span>
          <span className="group-hover:text-neutral-500 transition-colors">
            {originalUrl}
          </span>
        </div>
        <div className="border-b-2 border-white" />
        <div
          className="group cursor-pointer p-2 px-3 truncate"
          onClick={() => handleCopy(`${websiteUrl}/${shortKey}`)}
        >
          <span className="font-medium">단축후: </span>
          <span className="group-hover:text-neutral-500 transition-colors">
            {websiteUrl}/{shortKey}
          </span>
        </div>
      </div>
    </>
  );
}
