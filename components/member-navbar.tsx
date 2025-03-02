import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

const NavKeys = [
  { name: "URL 단축", path: "/convert-url" },
  { name: "UTM 변환", path: "/convert-utm" },
  { name: "UTM 대시보드", path: "/dashboard" },
];

export default async function MemeberNavbar() {
  return (
    <div className="w-full bg-white p-5 xl:px-16 flex justify-between items-center gap-2 shadow-md rounded-b-xl">
      <div className="flex gap-8 items-center *:font-bold *:text-md">
        <Link href="/home" className="text-3xl font-anton uppercase">
          we : rl
        </Link>
        {NavKeys.map(({ name, path }) => (
          <Link
            key={name + path}
            href={path}
            className="text-gray-600 hover:text-neutral-900 transition-colors"
          >
            {name}
          </Link>
        ))}
      </div>
      <Suspense fallback={<AvatarLoading />}>
        <UserAvatar />
      </Suspense>
    </div>
  );
}

async function UserAvatar() {
  const session = await getSession();

  if (!session || !session.id) redirect("/");

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: { username: true, avatar: true },
  });

  if (!user) notFound();

  return (
    <Link href="/profile" className="flex gap-2 items-center">
      <div className="size-10 border-2 border-white rounded-full overflow-hidden relative bg-white">
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
    </Link>
  );
}

function AvatarLoading() {
  return (
    <div className="size-10 border-2 border-white rounded-full overflow-hidden relative bg-white">
      <UserIcon />
    </div>
  );
}
