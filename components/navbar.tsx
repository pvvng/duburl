import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full p-5 flex justify-between items-center gap-2 bg-slate-200">
      <div className="flex items-center gap-5">
        <div className="text-4xl">LOGO</div>
        <div className="flex gap-3 items-center">
          <Link href={"/"}>Link</Link>
          <Link href={"/"}>Link</Link>
          <Link href={"/"}>Link</Link>
          <Link href={"/"}>Link</Link>
          <Link href={"/"}>Link</Link>
          <Link href={"/"}>Link</Link>
        </div>
      </div>
      <Link
        href={"/"}
        className="bg-white p-2 px-3 rounded-md font-medium transition-colors hover:bg-neutral-100"
      >
        로그인
      </Link>
    </div>
  );
}
