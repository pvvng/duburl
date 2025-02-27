import Link from "next/link";

export default function GuestNavbar() {
  return (
    <div className="w-full p-7 flex justify-between items-center gap-2 bg-gradient-to-br to-blue-300 from-violet-600 text-white shadow-md rounded-b-md">
      <Link href="/" className="text-4xl font-anton uppercase">
        we : rl
      </Link>
      <Link
        href="/login"
        className="bg-white text-black p-2 px-3 rounded-md font-semibold transition-colors hover:bg-neutral-200"
      >
        로그인
      </Link>
    </div>
  );
}
