"use client";

import { copyToClipboard } from "@/util/copy-to-clipboard";
import {
  InformationCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

interface Props {
  nickname?: string | null;
  shortKey: string;
  originalUrl: string;
}

export default function UrlCard({ nickname, shortKey, originalUrl }: Props) {
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
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

  return (
    <>
      {messageVisible && (
        <div
          className="fixed bottom-1/2 left-1/2 animate-moveUp font-semibold
        flex gap-2 bg-green-500 text-white p-3 px-5 rounded-md text-center"
        >
          <InformationCircleIcon className="size-6" />
          <p>복사 성공!</p>
        </div>
      )}
      <div className="flex flex-col rounded-md bg-neutral-200">
        {nickname !== undefined && (
          <div className="p-2 px-3 flex justify-between items-center">
            <p className="font-semibold text-xl">
              {nickname ? nickname : "별명 없음"}
            </p>
            <div className="flex gap-2 *:size-5">
              <button aria-label="Edit">
                <PencilSquareIcon className="transition-colors hover:text-green-500" />
              </button>
              <button aria-label="Delete">
                <TrashIcon className="transition-colors hover:text-green-500" />
              </button>
            </div>
          </div>
        )}
        {nickname !== undefined && <div className="border-b-2 border-white" />}
        <div
          className="group cursor-pointer p-2 px-3 truncate"
          onClick={() => handleCopy(originalUrl)}
        >
          <span className="font-medium">단축전: </span>
          <span className="group-hover:text-green-500 transition-colors">
            {originalUrl}
          </span>
        </div>
        <div className="border-b-2 border-white" />
        <div
          className="group cursor-pointer p-2 px-3 truncate"
          onClick={() => handleCopy(`${websiteUrl}/${shortKey}`)}
        >
          <span className="font-medium">단축후: </span>
          <span className="group-hover:text-green-500 transition-colors">
            {websiteUrl}/{shortKey}
          </span>
        </div>
      </div>
    </>
  );
}
