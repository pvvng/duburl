"use client";

import Button from "@/components/form-button";
import Input from "@/components/form-input";
import { convertUrl } from "@/app/(url)/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { formDeafultValue } from "@/util/constants/form-deafult-value";
import { copyToClipboard } from "@/util/copy-to-clipboard";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import { LocalURLType } from "@/util/types/short-key";
import { getLocalURLs, setLocalURLs } from "@/util/local-urls/local-urls";
import { getUniqueKeys } from "@/util/local-urls/get-unique-keys";

export const metadata: Metadata = {
  title: "홈",
};

export default function ConvertUrlForm() {
  const [actionResult, action] = useActionState(convertUrl, formDeafultValue);
  const [previousURLs, setPreviousURLs] = useState<LocalURLType[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // 키 설정을 위한 초기화 및 검증
  useEffect(() => {
    // 웹사이트 origin-url 불러오기 및 이전 URL 설정
    const initializeURLs = () => {
      const currentUrl = window.location.origin;
      setWebsiteUrl(currentUrl);

      const localURLs = getLocalURLs();
      setPreviousURLs(localURLs);
    };

    initializeURLs();
  }, []);

  useEffect(() => {
    if (actionResult.success && actionResult.result) {
      const newKey: LocalURLType = actionResult.result;
      const updatedKeys = getUniqueKeys(previousURLs, newKey).slice(0, 10);

      setPreviousURLs(updatedKeys);
      setLocalURLs(updatedKeys);
    }
  }, [actionResult]);

  return (
    <div className="max-w-screen-sm  mx-auto flex flex-col justify-center gap-6 p-5">
      {messageVisible && (
        <div
          className="fixed bottom-1/2 left-1/2 animate-moveUp font-semibold
        flex gap-2 bg-indigo-500 text-white p-3 px-5 rounded-md text-center"
        >
          <InformationCircleIcon className="size-6" />
          <p>복사 성공!</p>
        </div>
      )}
      <h1 className="text-2xl font-semibold">🥳 긴 URL 짧게 만드는 사이트</h1>
      <form action={action} className="flex flex-col justify-center gap-3">
        <Input
          name="url"
          type="text"
          placeholder="단축하고 싶은 URL을 입력하세요."
          required
          errors={!actionResult.success ? actionResult.errors : []}
        />
        <Button text="URL 단축하기" />
      </form>
      <div className="border-2 shadow-md border-indigo-500 rounded-md">
        <div className="border-b-2 border-b-indigo-500 flex flex-col gap-3 p-5">
          <p className="font-semibold text-lg">사용 방법</p>
          <p>1. 입력창에 단축하고 싶은 URL을 복사해서 붙여넣습니다.</p>
          <p>2. 단축된 URL을 브라우저 주소창에 붙여넣습니다.</p>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h2 className="font-semibold text-lg">
            이전 변경 내역 (클릭하여 복사하기)
          </h2>
          <p className="text-sm text-indigo-500">
            최근 10개의 변경 내역만 저장됩니다.
          </p>
          {previousURLs.length === 0 && (
            <p>URL 단축 내역이 존재하지 않습니다.</p>
          )}
          {previousURLs.map(({ originalUrl, shortKey }) => (
            <div
              key={shortKey}
              className="flex flex-col gap-1 rounded-md bg-neutral-200 break-words"
            >
              <span
                className="hover:text-indigo-500 transition-colors cursor-pointer p-2 px-3"
                onClick={() => handleCopy(originalUrl)}
              >
                단축 전: {originalUrl}
              </span>
              <div className="border-b-2 border-white" />
              <span
                className="hover:text-indigo-500 transition-colors cursor-pointer p-2 px-3"
                onClick={() => handleCopy(`${websiteUrl}/${shortKey}`)}
              >
                단축 후: {websiteUrl}/{shortKey}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
