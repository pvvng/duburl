"use client";

import { useState } from "react";
import Button from "../form-button";
import Input from "../form-input";
import { useRouter } from "next/navigation";

export function SearchForm({ search }: { search: string }) {
  const [searchState, setSearchState] = useState(search);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    // 새로고침 방지
    e.preventDefault();
    // 현재 주소 불러오기
    const nowLocation = window.location.pathname;
    // 검색어 URI 인코딩
    const encodedSearch = encodeURIComponent(searchState);
    // 라우팅
    if (encodedSearch === "") {
      router.replace(nowLocation);
    } else {
      router.push(`${nowLocation}?search=${encodedSearch}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="w-3/4">
        <Input
          name="search"
          placeholder="별명으로 검색하기"
          value={searchState}
          onChange={(e) => setSearchState(e.target.value)}
        />
      </div>
      <div className="w-1/4">
        <Button text="검색" />
      </div>
    </form>
  );
}
