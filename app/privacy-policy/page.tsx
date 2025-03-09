import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="p-5 xl:px-16 flex flex-col gap-5">
      <h1 className="text-2xl font-semibold">
        개인정보 처리 방침{" "}
        <span className="text-sm text-gray-600">최종 수정일: [2024-03-09]</span>
      </h1>
      <p>
        [duburl](이하 ‘사이트’)은 이용자의 개인정보를 중요시하며, 「개인정보
        보호법」을 준수하고 있습니다. 본 방침은 개인정보가 어떻게 수집되고
        이용되는지 설명합니다.
      </p>
      <ul className="list-decimal list-inside flex flex-col gap-2">
        <hr />
        <li className="text-xl font-semibold">수집하는 개인정보의 항목</li>
        <ul className="p-2 list-inside list-disc">
          <li>필수 정보: 쿠키, 방문 기록, 이메일</li>
          <li>
            자동 수집 정보: Google AdSense 및 트래픽 분석 도구를 통한 정보
          </li>
        </ul>

        <hr />

        <li className="text-xl font-semibold">개인정보의 수집 및 이용 목적</li>
        <ul className="p-2 list-inside list-disc">
          <li>URL 단축 서비스 제공</li>
          <li>맞춤형 광고 제공 (Google AdSense)</li>
          <li>서비스 개선 및 통계 분석</li>
        </ul>

        <hr />

        <li className="text-xl font-semibold">개인정보의 보유 및 이용 기간</li>
        <ul className="p-2 list-inside list-disc">
          <li>
            원칙적으로, 수집된 개인정보는{" "}
            <strong>목적 달성 시 즉시 파기</strong>합니다.
          </li>
          <li>법령에 따른 보존 필요 시 예외 적용.</li>
        </ul>

        <hr />

        <li className="text-xl font-semibold">제3자 제공 및 위탁</li>
        <ul className="p-2 list-inside list-disc">
          <li>제공 대상: Google AdSense, Google Search Console</li>
          <li>목적: 맞춤형 광고 제공, 서비스 개선 및 통계 분석</li>
          <li>제공 항목: 쿠키 정보, 방문 기록</li>
          <li>
            거부 방법:{" "}
            <Link href={"#5"} className="text-blue-500">
              쿠키의 사용 및 거부 방법
            </Link>{" "}
            항목 참고
          </li>
        </ul>

        <hr />

        <li id="5" className="text-xl font-semibold">
          쿠키의 사용 및 거부 방법
        </li>
        <ul className="p-2 list-inside list-disc">
          <li>거부 방법:</li>
          <ul className="px-2 list-inside list-disc">
            <li>
              Chrome: 설정 &gt; 개인정보 및 보안 &gt; 쿠키 및 기타 사이트 데이터
            </li>
          </ul>
        </ul>

        <hr />

        <li className="text-xl font-semibold">이용자의 권리와 행사 방법</li>
        <ul className="p-2 list-inside list-disc">
          <li>개인정보 열람, 수정, 삭제 요청 가능</li>
          <li>쿠키 차단 설정 가능</li>
          <li>문의: [gdounu093@gmail.com]</li>
        </ul>

        <hr />

        <li className="text-xl font-semibold">문의처</li>
        <ul className="p-2 list-inside list-disc">
          <li>이메일: [gdounu093@gmail.com]</li>
          <li>운영 시간: 평일 09:00 ~ 18:00</li>
        </ul>
      </ul>
    </div>
  );
}
