import Button from "@/components/form-button";
import Input from "@/components/form-input";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16">
      <div className="max-w-screen-sm mx-auto flex flex-col justify-center gap-10 p-5">
        <h1 className="text-2xl font-semibold">✂ 긴 URL 짧게 변환하기</h1>
        <form className="flex flex-col justify-center gap-3">
          <Input
            name="nickname"
            type="text"
            placeholder="단축할 URL의 별명을 적어주세요."
            required
          />
          <Input
            name="url"
            type="url"
            placeholder="단축할 URL을 입력하세요."
            required
          />
          <Button text="변환하기" />
        </form>
        <div className="bg-white rounded-md p-5 shadow-md">
          <p className="text-xl font-semibold">내 URL</p>
        </div>
      </div>
    </div>
  );
}
