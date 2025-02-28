"use client";

import { useActionState } from "react";
import Button from "./form-button";
import Input from "./form-input";
import { memberConvertUrl } from "@/app/(member)/convert/actions";
import { formDeafultValue } from "@/lib/create-result-object";

export default function MemberConvertUrlForm() {
  const [state, action] = useActionState(memberConvertUrl, formDeafultValue);

  return (
    <form action={action} className="flex flex-col justify-center gap-3">
      <Input
        name="nickname"
        type="text"
        placeholder="단축할 URL의 별명을 적어주세요."
        // required
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
