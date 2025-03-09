import Link from "next/link";

export default function Footer() {
  return (
    <div className="p-5 xl:px-16 border-t border-neutral-200 py-10">
      <div className="flex justify-between items-start">
        <div>
          <Link href="/" className="uppercase font-anton text-4xl">
            duburl
          </Link>
          <p className="text-sm text-gray-400 mt-2">
            © 2025 pvvng. All rights reserved.
          </p>
        </div>
        <Link
          href="/privacy-policy"
          className="text-blue-500 hover:text-blue-400 transition-colors"
        >
          개인정보 처리 방침
        </Link>
      </div>
    </div>
  );
}
