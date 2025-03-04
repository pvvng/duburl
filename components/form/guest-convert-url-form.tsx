"use client";

import Button from "@/components/form-button";
import Input from "@/components/form-input";
import { convertUrl } from "@/app/(url)/actions";
import { LocalURLType } from "@/util/types/short-key";
import { getLocalURLs, setLocalURLs } from "@/util/local-urls/local-urls";
import { getUniqueKeys } from "@/util/local-urls/get-unique-keys";
import { useActionState, useEffect, useState } from "react";
import { formDeafultValue } from "@/lib/create-result-object";
import UrlCard from "../url-card";

export default function GuestConvertUrlForm() {
  const [actionResult, action] = useActionState(convertUrl, formDeafultValue);
  const [previousURLs, setPreviousURLs] = useState<LocalURLType[]>([]);

  // 키 설정을 위한 초기화 및 검증
  useEffect(() => {
    // 웹사이트 origin-url 불러오기 및 이전 URL 설정
    const initializeURLs = () => {
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
    <div className="max-w-screen-sm mx-auto flex flex-col justify-center gap-5 p-5">
      <h1 className="text-2xl font-semibold">✂ 긴 URL 짧게 만드는 사이트</h1>
      <form action={action} className="flex flex-col justify-center gap-3">
        <Input
          name="url"
          type="url"
          placeholder="단축할 URL을 입력하세요."
          required
          errors={!actionResult.success ? actionResult.formErrors : []}
        />
        <Button text="URL 단축하기" />
      </form>
      <div className="border-2 shadow-md border-neutral-200 rounded-xl">
        <div className="border-b-2 border-b-neutral-200 flex flex-col gap-3 p-5">
          <p className="font-semibold text-lg">사용 방법</p>
          <p>1. 입력창에 단축하고 싶은 URL을 복사해서 붙여넣습니다.</p>
          <p>2. 단축된 URL을 브라우저 주소창에 붙여넣습니다.</p>
        </div>
        <div className="flex flex-col gap-3 p-5">
          <h2 className="font-semibold text-lg">
            이전 변경 내역 (클릭하여 복사하기)
          </h2>
          <p className="text-sm text-neutral-500">
            최근 10개의 변경 내역만 저장됩니다.
          </p>
          {previousURLs.length === 0 && (
            <p>URL 단축 내역이 존재하지 않습니다.</p>
          )}
          {previousURLs.map((url) => (
            <UrlCard key={url.shortKey} {...url} />
          ))}
        </div>
      </div>
    </div>
  );
}
