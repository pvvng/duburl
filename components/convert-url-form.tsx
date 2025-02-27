"use client";

import Button from "@/components/form-button";
import Input from "@/components/form-input";
import LocalURLsResultsBox from "./local-urls-results";
import { convertUrl } from "@/app/(url)/actions";
import { formDeafultValue } from "@/util/constants/form-deafult-value";
import { LocalURLType } from "@/util/types/short-key";
import { getLocalURLs, setLocalURLs } from "@/util/local-urls/local-urls";
import { getUniqueKeys } from "@/util/local-urls/get-unique-keys";
import { useActionState, useEffect, useState } from "react";

export default function ConvertUrlForm() {
  const [actionResult, action] = useActionState(convertUrl, formDeafultValue);
  const [previousURLs, setPreviousURLs] = useState<LocalURLType[]>([]);
  const [websiteUrl, setWebsiteUrl] = useState<string>("");

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
    <div className="max-w-screen-sm mx-auto flex flex-col justify-center gap-10 p-5">
      <h1 className="text-2xl font-semibold">✂ 긴 URL 짧게 만드는 사이트</h1>
      <form action={action} className="flex flex-col justify-center gap-3">
        <Input
          name="url"
          type="url"
          placeholder="단축할 URL을 입력하세요."
          required
          errors={!actionResult.success ? actionResult.errors : []}
        />
        <Button text="URL 단축하기" />
      </form>
      <LocalURLsResultsBox
        previousURLs={previousURLs}
        websiteUrl={websiteUrl}
      />
    </div>
  );
}
