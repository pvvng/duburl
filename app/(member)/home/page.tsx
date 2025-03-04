import MemberConvertUrlForm from "@/components/form/member-convert-url-form";
import { Suspense } from "react";
import { UserUrls } from "@/components/member-urls";
import { UserUrlsLoading } from "@/components/member-urls-loading";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16 flex md:flex-row flex-col gap-5">
      <div className="md:w-1/3">
        <MemberConvertUrlForm />
      </div>
      <div className="md:w-2/3">
        <Suspense fallback={<UserUrlsLoading />}>
          <UserUrls />
        </Suspense>
      </div>
    </div>
  );
}
