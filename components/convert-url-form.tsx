"use client";

import Button from "@/components/form-button";
import Input from "@/components/form-input";
import { convertUrl } from "@/app/(url)/actions";
import { useActionState, useEffect, useRef, useState } from "react";
import { formDeafultValue } from "@/util/constants/form-deafult-value";
import { validateLocalShortKeys } from "@/util/short-key/validate-local-key";
import { getUniqueKeys } from "@/util/short-key/get-unique-keys";
import { getLocalKeys, setLocalKeys } from "@/util/short-key/local-keys";
import { copyToClipboard } from "@/util/copy-to-clipboard";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function ConvertUrlForm() {
  const [actionResult, action] = useActionState(convertUrl, formDeafultValue);
  const [shortKeys, setShortKeys] = useState<string[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = async (key: string) => {
    const result = await copyToClipboard(`${websiteUrl}/${key}`);
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
    const currentUrl = window.location.origin;
    setWebsiteUrl(currentUrl);

    const initializeKeys = () => {
      const localKeys = getLocalKeys();
      if (!localKeys) {
        setLocalKeys([]);
        return [];
      }

      return validateLocalShortKeys(localKeys);
    };

    const parsedKeys = initializeKeys();
    setShortKeys((pre) => getUniqueKeys(pre, parsedKeys));
  }, []);

  useEffect(() => {
    if (actionResult.success) {
      const newKey = actionResult.result?.shortKey;
      if (newKey) {
        setShortKeys((pre) => {
          const updatedKeys = getUniqueKeys(pre, [newKey]);
          setLocalKeys(updatedKeys);
          return updatedKeys;
        });
      }
    }
  }, [actionResult]);

  return (
    <div className="max-w-screen-sm  mx-auto flex flex-col justify-center gap-6 p-5">
      {messageVisible && (
        <div
          className="fixed bottom-1/2 left-1/2 animate-moveUp
        flex gap-2 bg-indigo-500 text-white p-3 px-5 rounded-md text-center"
        >
          <InformationCircleIcon className="size-6" />
          <p>캡쳐 성공!</p>
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
        <Button text="단축하기" />
      </form>
      <div className="border-2 border-indigo-500 p-5 rounded-md flex flex-col gap-3">
        <h2 className="text-lg font-semibold">
          이전 변경 내역 (URL 클릭하여 복사)
        </h2>
        {shortKeys.length === 0 && <p>URL 단축 내역이 존재하지 않습니다.</p>}
        {shortKeys.map((key) => (
          <span
            key={key}
            className="hover:text-indigo-500 transition-colors cursor-pointer"
            onClick={() => handleCopy(key)}
          >
            {websiteUrl}/{key}
          </span>
        ))}
      </div>
    </div>
  );
}
