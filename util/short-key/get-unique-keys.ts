/**
 * **키의 중복을 제외한 키 배열을 반환하는 함수**
 * @param preKeys 이전 키 배열
 * @param newKeys 추가할 키 배열
 * @returns
 */
export function getUniqueKeys(preKeys: string[], newKeys: string[]): string[] {
  return [...new Set([...preKeys, ...newKeys])];
}
