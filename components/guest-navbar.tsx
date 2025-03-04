import Link from "next/link";

export default function GuestNavbar() {
  return (
    <div className="w-full p-5 xl:px-16 flex justify-between items-center gap-2 shadow-md rounded-b-xl">
      <Link href="/" className="text-3xl font-anton uppercase">
        werl
      </Link>
      <Link
        href="/login"
        className="bg-neutral-300 text-black p-2 px-4 rounded-xl font-semibold transition-colors 
        hover:bg-neutral-400 border border-neutral-300"
      >
        로그인
      </Link>
    </div>
  );
}
