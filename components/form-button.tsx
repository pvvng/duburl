"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  // 부모의 form을 찾아서 action이 pending 중인지 여부 확인하는 훅
  // form의 child 컴포넌트에서만 사용 가능
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="w-full h-10 text-center bg-black rounded-md text-white font-medium shadow-md
      hover:bg-neutral-800 transition-all disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
