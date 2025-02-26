import { nanoid } from "nanoid";

/** 랜덤한 6자리 문자열 생성 (예: "A1bC2d") */
export default function generateShortKey(length: number = 6): string {
  return nanoid(length);
}
