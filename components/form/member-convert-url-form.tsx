"use client";

import { useActionState } from "react";
import Button from "../form-button";
import Input from "../form-input";
import { memberConvertUrl } from "@/app/(member)/home/actions";
import { formDeafultValue } from "@/lib/create-result-object";
import { ScissorsIcon } from "@heroicons/react/24/outline";

export default function MemberConvertUrlForm() {
  const [state, action] = useActionState(memberConvertUrl, formDeafultValue);

  return (
    <form
      action={action}
      className="flex flex-col justify-center gap-3 white-card"
    >
      <div className="text-xl font-semibold flex gap-2 items-center">
        <ScissorsIcon className="size-6" />
        <span>긴 URL 짧게 변환하기</span>
      </div>
      <Input
        name="nickname"
        type="text"
        placeholder="단축할 URL의 별명을 적어주세요."
        // maxLength={20}
        errors={state.fieldErrors.nickname}
      />
      <Input
        name="url"
        type="url"
        placeholder="단축할 URL을 입력하세요."
        required
        errors={state.fieldErrors.url}
      />
      <Button text="변환하기" />
    </form>
  );
}
