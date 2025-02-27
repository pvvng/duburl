import db from "@/lib/db";
import getSession from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";

export default async function MemeberNavbar() {
  return (
    <div className="w-full bg-white p-5 xl:px-16 flex justify-between items-center gap-2 shadow-md rounded-b-md">
      <div className="flex gap-8 items-center *:font-bold *:text-md">
        <Link href="/home" className="text-3xl font-anton uppercase">
          we : rl
        </Link>
        <Link href="/home" className="text-gray-600">
          Link
        </Link>
        <Link href="/home" className="text-gray-600">
          Link
        </Link>
        <Link href="/home" className="text-gray-600">
          Link
        </Link>
        <Link href="/home" className="text-gray-600">
          Link
        </Link>
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
