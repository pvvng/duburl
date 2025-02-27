import { copyToClipboard } from "@/util/copy-to-clipboard";
import { LocalURLType } from "@/util/types/short-key";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";

interface Props {
  previousURLs: LocalURLType[];
  websiteUrl: string;
}

export default function LocalURLsResultsBox({
  previousURLs,
  websiteUrl,
}: Props) {
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

  return (
    <>
      {messageVisible && (
        <div
          className="fixed bottom-1/2 left-1/2 animate-moveUp font-semibold
        flex gap-2 bg-indigo-500 text-white p-3 px-5 rounded-md text-center"
        >
          <InformationCircleIcon className="size-6" />
          <p>복사 성공!</p>
        </div>
      )}
      <div className="border-2 shadow-md border-neutral-200 rounded-md">
        <div className="border-b-2 border-b-neutral-200 flex flex-col gap-3 p-5">
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
              className="flex flex-col gap-1 rounded-md bg-neutral-200"
            >
              <div
                className="hover:text-indigo-500 transition-colors cursor-pointer p-2 px-3 truncate"
                onClick={() => handleCopy(originalUrl)}
              >
                <span className="font-medium">단축 전: </span>
                <span>{originalUrl}</span>
              </div>
              <div className="border-b-2 border-white" />
              <div
                className="hover:text-indigo-500 transition-colors cursor-pointer p-2 px-3 truncate"
                onClick={() => handleCopy(`${websiteUrl}/${shortKey}`)}
              >
                <span className="font-medium">단축 후: </span>
                <span>
                  {websiteUrl}/{shortKey}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
