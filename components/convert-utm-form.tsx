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
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { UserUrls } from "@/lib/data/user-urls";

export default function UTMForm({ userUrls }: { userUrls: UserUrls }) {
  const [state, action] = useActionState(createUtm, null);

  const userUrlRadioValues = userUrls.map((userUrl) => ({
    text: userUrl.nickname || userUrl.url.shortKey,
    value: userUrl.url.originalUrl,
  }));

  return (
    <form action={action} className="white-card flex flex-col gap-5">
      <div className="text-xl font-semibold flex gap-2 items-center">
        <PresentationChartBarIcon className="size-6" />
        <span>UTM 생성하기</span>
      </div>
      <div className="flex gap-1 items-center *:text-red-500">
        <ExclamationTriangleIcon className="size-5" />
        <p>
          URL에 띄어쓰기는 허용되지 않습니다. 만약 띄어쓰기가 필요하다면{" "}
          <span className="font-semibold">"_"</span> 혹은{" "}
          <span className="font-semibold">"-"</span> 기호로 대체해주세요.
        </p>
      </div>
      <div>
        <p className="font-semibold mb-3">
          * UTM으로 변환할 URL{" "}
          <span className="text-orange-500 text-xs">(필수)</span>
        </p>
        <RadioInputs
          name="url"
          values={userUrlRadioValues}
          required
          useExtra
          extraPlaceholder="UTM으로 변환할 URL을 입력하세요."
          extraType="url"
          errors={state?.fieldErrors.url}
        />
      </div>
      <div>
        <p className="font-semibold mb-3">
          * 웹사이트 홍보 경로{" "}
          <span className="text-orange-500 text-xs">(필수)</span>
        </p>
        <RadioInputs
          name="utm_source"
          values={UTMSourceValues}
          required
          useExtra
          extraPlaceholder="기타 경로 작성 (영어 작성 권장)"
          errors={state?.fieldErrors.utm_source}
        />
      </div>
      <div>
        <p className="font-semibold mb-3">
          * 웹사이트 유입 매체{" "}
          <span className="text-orange-500 text-xs">(필수)</span>
        </p>
        <RadioInputs
          name="utm_medium"
          values={UTMMediumValues}
          required
          useExtra
          extraPlaceholder="기타 유입 매체 작성 (영어 작성 권장)"
          errors={state?.fieldErrors.utm_medium}
        />
      </div>
      <div>
        <p className="font-semibold mb-3">
          * 광고/이벤트/캠페인 이름{" "}
          <span className="text-orange-500 text-xs">(필수)</span>
        </p>
        <Input
          name="utm_campaign"
          placeholder="광고/이벤트/캠페인 이름의 이름을 작성해주세요."
          required
          errors={state?.fieldErrors.utm_campaign}
        />
      </div>
      <div>
        <p className="font-semibold mb-3">검색 광고의 키워드</p>
        <Input
          name="utm_term"
          placeholder="예시) 가을_한정_특가, 블랙_프라이데이"
          errors={state?.fieldErrors.utm_term}
        />
      </div>
      <div>
        <p className="font-semibold mb-3">동일한 광고 내에서 비교할 요소</p>
        <Input
          name="utm_content"
          placeholder="예시) 버튼_클릭, 런닝화_사진_1등"
          errors={state?.fieldErrors.utm_content}
        />
      </div>
      <div>
        <p className="font-semibold mb-3">저장할 UTM 별명 지정 </p>
        <Input
          name="nickname"
          type="text"
          placeholder="예시) 가을 특가 세일 - 사용자 검색"
          errors={state?.fieldErrors.nickname}
        />
      </div>
      <Button text="생성하기" />
    </form>
  );
}
