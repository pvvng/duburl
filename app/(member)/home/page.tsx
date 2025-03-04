import MemberConvertUrlForm from "@/components/form/member-convert-url-form";
import { Suspense } from "react";
import { UserUrls } from "@/components/member-urls";
import { UserUrlsLoading } from "@/components/member-urls-loading";

export default async function ConvertUrl() {
  return (
    <div className="p-5 xl:p-16">
      <div className="flex flex-col gap-5 max-w-screen-sm mx-auto">
        <MemberConvertUrlForm />
        <Suspense fallback={<UserUrlsLoading />}>
          <UserUrls />
        </Suspense>
      </div>
    </div>
  );
}
