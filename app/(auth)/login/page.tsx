import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Login() {
  return (
    <div className="max-w-screen-sm h-screen p-5 flex flex-col gap-5 justify-center items-center mx-auto">
      <div className="flex flex-col text-center">
        <h1 className="text-[100px] font-anton uppercase">duburl</h1>
        <h2 className="font-medium">긴 URL 단축하는 웹사이트</h2>
      </div>
      <div className="*:w-52 *:h-12 flex flex-col gap-3 mt-5">
        <a
          href="/kakao/start"
          className="border border-[#FEE500] bg-[#FEE500] flex justify-between items-center 
          rounded-lg p-3 hover:scale-95 transition-transform font-medium text-black"
        >
          <Image
            src="/kakao-icon.svg"
            alt="kakao"
            width={20}
            height={20}
            className="size-5"
          />
          <p>카카오 로그인</p>
          <div />
        </a>
        <a
          href="/google/start"
          className="border border-neutral-300  bg-transparent flex justify-between items-center 
          rounded-lg p-3 hover:scale-95 transition-transform font-medium"
        >
          <Image
            src="/google-icon.svg"
            alt="google"
            width={20}
            height={20}
            className="size-5"
          />
          <p>구글 로그인</p>
          <div />
        </a>
      </div>
    </div>
  );
}
