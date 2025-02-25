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
      className="bg-indigo-500 rounded-md text-white font-medium hover:bg-indigo-400 transition-all active:scale-95
      h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
    >
      {pending ? "로딩 중" : text}
    </button>
  );
}
