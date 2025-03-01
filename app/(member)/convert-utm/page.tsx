import UTMForm from "@/components/convert-utm-form";
import {
  ChartBarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

export default function ConvertUTM() {
  return (
    <div className="p-5 xl:p-16 flex flex-col gap-5">
      <UTMForm />
      <div className="flex flex-col gap-5">
        <div className="white-card">
          <p className="font-semibold text-lg flex gap-2 items-center">
            <QuestionMarkCircleIcon className="size-6" />
            <span>UTM이 뭔가요?</span>
          </p>
          <div className="p-3 flex flex-col gap-1">
            <p>
              UTM(Urchin Tracking Module)은 웹사이트 방문자가 어디에서 왔는지
              추적할 수 있도록 돕는{" "}
              <span className="font-semibold">특별한 URL 코드</span>
              입니다.
            </p>
            <p>
              UTM 링크에 <span className="font-semibold">추적 정보를 추가</span>
              해서 “이 사람이 어떤 광고나 이메일을 통해 들어왔는지”를 알아낼 수
              있습니다.
            </p>
            <p className="font-semibold">
              쉽게 말해, UTM은 “어디서, 어떻게, 왜” 사람들이 내 웹사이트를
              방문하는지 추적하는 도구입니다.
            </p>
          </div>
        </div>
        <div className="white-card flex flex-col gap-1">
          <p className="font-semibold text-lg flex gap-2 items-center">
            <ChartBarIcon className="size-6" />
            <span>UTM이 왜 중요할까요?</span>
          </p>
          <ul className="list-inside list-decimal p-3 flex flex-col gap-1">
            <li>광고나 마케팅 효과를 측정할 수 있어요.</li>
            <li>
              어떤 방법(광고, 이메일, SNS 등)이 가장 효과적인지 알 수 있어요.
            </li>
            <li>데이터를 기반으로 더 나은 마케팅 전략을 세울 수 있어요.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
