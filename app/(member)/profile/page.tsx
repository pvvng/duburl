import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Profile() {
  const session = await getSession();

  if (!session || !session.id) notFound();

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      avatar: true,
      email: true,
      kakao_id: true,
    },
  });

  if (!user) notFound();

  return (
    <div className="p-5 xl:p-16">
      <h1 className="font-semibold text-2xl mb-3">내 프로필</h1>
      <div className="w-full white-card p-5 flex md:flex-row flex-col gap-3 md:gap-10">
        <div className="size-36 border-2 border-white rounded-full overflow-hidden relative white-card mx-auto md:mx-0">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={user.username}
              fill
              sizes="36"
              className="object-cover"
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <p className="text-sm text-gray-600">이름</p>
            <p className="font-semibold text-xl">{user.username}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">이메일</p>
            <p className="text-xl">
              {user.email ? user.email : "확인되지 않음"}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">연동된 SNS</p>
            <p>
              {user.kakao_id && (
                <span className="text-yellow-500 text-xl">카카오톡</span>
              )}
            </p>
          </div>
          <Link
            href="#1"
            className="bg-neutral-100 hover:bg-neutral-200 transition-colors 
                font-medium text-center p-2 px-3 rounded-xl shadow-md"
          >
            프로필 편집
          </Link>
        </div>
      </div>
    </div>
  );
}
