import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "로그인",
};

export default function Login() {
  return (
    <div className="max-w-screen-sm h-screen p-5 flex flex-col gap-5 justify-center items-center mx-auto">
      <div className="flex flex-col text-center">
        <h1 className="text-[120px] font-anton uppercase">we rl</h1>
        <h2 className="font-semibold">긴 URL 단축하는 웹사이트</h2>
      </div>
      <div className="flex flex-col gap-2">
        <a href="/kakao/start" className="transition">
          <Image
            src="/kakao-login.png"
            alt="kakao-login"
            width={200}
            height={49}
          />
        </a>
      </div>
    </div>
  );
}

// 카카오 => w-366 h-90
