/**
 * **로컬 스토리지의 키 배열 검증하는 함수**
 * @param localKeys 로컬 스토리지에 저장된 raw keys value
 * @returns 검증된 키 배열, 예상치 못한 에러 상황에는 빈 배열 반환
 */
export function validateLocalShortKeys(localKeys: string): string[] {
  let parsedKeys: unknown;

  try {
    parsedKeys = JSON.parse(localKeys);
  } catch (error) {
    // 비정상적인 데이터일 경우엔 빈 배열 반환
    return [];
  }

  // 배열이 아닐 경우엔 빈 배열 반환
  if (!Array.isArray(parsedKeys)) {
    return [];
  }

  return parsedKeys.filter(
    (key) => typeof key === "string" && key.length === 6
  );
}
