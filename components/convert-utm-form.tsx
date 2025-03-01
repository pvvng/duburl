"use client";

import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import RadioInputs from "./form-radio-input";
import Input from "./form-input";
import Button from "./form-button";
import {
  UTMMediumValues,
  UTMSourceValues,
} from "@/util/constants/radio-values";
import { useActionState } from "react";
import { createUtm } from "@/app/(member)/convert-utm/actions";

export default function UTMForm() {
  const [state, action] = useActionState(createUtm, null);

  return (
    <form action={action} className="white-card flex flex-col gap-3">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <PresentationChartBarIcon className="size-6" />
        <span>UTM 생성하기</span>
      </div>
      <p className="font-semibold">
        1. 웹사이트 홍보 경로{" "}
        <span className="text-orange-500 text-xs">(필수 선택)</span>
      </p>
      <RadioInputs
        name="utm_source"
        values={UTMSourceValues}
        required
        useExtra
        extraPlaceholder="기타 경로 작성 (영어 작성 권장)"
        errors={state?.fieldErrors.utm_source}
      />
      <p className="font-semibold">
        2. 웹사이트 유입 매체{" "}
        <span className="text-orange-500 text-xs">(필수 선택)</span>
      </p>
      <RadioInputs
        name="utm_medium"
        values={UTMMediumValues}
        required
        useExtra
        extraPlaceholder="기타 유입 매체 작성 (영어 작성 권장)"
        errors={state?.fieldErrors.utm_medium}
      />
      <p className="font-semibold">
        3. 광고/이벤트/캠페인 이름{" "}
        <span className="text-orange-500 text-xs">(필수 작성)</span>
      </p>
      <Input
        name="utm_campaign"
        placeholder="광고/이벤트/캠페인 이름의 이름을 작성해주세요."
        required
        errors={state?.fieldErrors.utm_campaign}
      />
      <p className="font-semibold">4. 검색 광고의 키워드</p>
      <Input
        name="utm_term"
        placeholder="검색 광고의 키워드를 입력해주세요"
        errors={state?.fieldErrors.utm_term}
      />
      <p className="font-semibold">5. 동일한 광고 내에서 비교할 요소</p>
      <Input
        name="utm_content"
        placeholder="예시: 버튼 클릭, 런닝화 사진 1 등"
        errors={state?.fieldErrors.utm_content}
      />
      <Button text="생성하기" />
    </form>
  );
}
