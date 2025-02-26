"use client";

import Button from "@/components/form-button";
import Input from "@/components/form-input";
import { convertUrl } from "@/app/(home)/actions";
import { useActionState } from "react";
import { formDeafultValue } from "@/util/constants/form-deafult-value";

export default function ConvertUrlForm() {
  const [state, action] = useActionState(convertUrl, formDeafultValue);

  console.log(state);
  return (
    <form
      action={action}
      className="max-w-screen-sm  mx-auto flex flex-col justify-center gap-3 p-5"
    >
      <h1 className="text-xl font-semibold">🥳 URL 단축</h1>
      <Input
        name="url"
        type="text"
        placeholder="단축하고 싶은 URL을 입력하세요."
        required
        errors={!state.success ? state.errors : []}
      />
      <Button text="변경하기" />
    </form>
  );
}
