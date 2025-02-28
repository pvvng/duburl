import MemberConvertUrlForm from "@/components/member-convert-url-form";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16">
      <div className="max-w-screen-sm mx-auto flex flex-col justify-center gap-10 p-5">
        <h1 className="text-2xl font-semibold">✂ 긴 URL 짧게 변환하기</h1>
        <MemberConvertUrlForm />
        <div className="bg-white rounded-md p-5 shadow-md">
          <p className="text-xl font-semibold">내 URL</p>
        </div>
      </div>
    </div>
  );
}
