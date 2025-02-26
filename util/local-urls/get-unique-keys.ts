import { LocalURLType } from "../types/short-key";

export function getUniqueKeys(
  preKeys: LocalURLType[],
  newKey: LocalURLType
): LocalURLType[] {
  return [
    newKey,
    // 새로 들어오는 키와 일치하는 값 제거
    ...preKeys.filter((preKey) => preKey.shortKey !== newKey.shortKey),
  ];
}
