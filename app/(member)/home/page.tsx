import MemberConvertUrlForm from "@/components/form/member-convert-url-form";
import { Suspense } from "react";
import { UserUrls } from "@/components/member-urls";
import { UserUrlsLoading } from "@/components/member-urls-loading";

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const search = (await searchParams).search || "";

  return (
    <div className="p-5 xl:p-16">
      <div className="flex flex-col gap-5 max-w-screen-sm mx-auto">
        <MemberConvertUrlForm />
        <Suspense fallback={<UserUrlsLoading />}>
          <UserUrls search={search} />
        </Suspense>
      </div>
    </div>
  );
}
