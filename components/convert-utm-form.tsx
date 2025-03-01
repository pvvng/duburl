"use client";

import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import RadioInput from "./form-radio-input";
import Input from "./form-input";
import Button from "./form-button";
import { UTMSourceValues } from "@/util/constants/radio-values";
import { useActionState } from "react";
import { createUtm } from "@/app/(member)/convert-utm/actions";

export default function UTMForm() {
  const [state, action] = useActionState(createUtm, null);

  return (
    <form action={action} className="white-card flex flex-col gap-5">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <PresentationChartBarIcon className="size-6" />
        <span>UTM 생성하기</span>
      </div>
      <p className="font-semibold">1. 웹사이트 홍보 경로 (필수 선택)</p>
      <RadioInput
        name="utm_source"
        values={UTMSourceValues}
        required
        useExtra
      />
      <p className="font-semibold">2. 웹사이트 유입 매체 (필수 작성)</p>
      <Input
        name="utm_medium"
        placeholder="예시) 클릭 광고, 이메일 링크 등"
        required
      />
      <p className="font-semibold">3. 광고/이벤트/캠페인 이름 (필수 작성)</p>
      <Input
        name="utm_campaign"
        placeholder="광고/이벤트/캠페인 이름의 이름을 작성해주세요."
        required
      />
      <p className="font-semibold">4. 검색 광고의 키워드</p>
      <Input name="utm_term" placeholder="검색 광고의 키워드를 입력해주세요" />
      <p className="font-semibold">5. 동일한 광고 내에서 비교할 요소</p>
      <Input
        name="utm_content"
        placeholder="예시: 버튼 클릭, 런닝화 사진 클릭 등"
      />
      <Button text="생성하기" />
    </form>
  );
}
