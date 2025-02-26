/**
 *
 * @param success action의 성공 여부
 * @param result 성공한 경우의 반환값
 * @param errors 에러 메시지 배열
 */
export function createActionResult<T>(
  success: boolean,
  result?: T,
  errors?: string[]
) {
  return {
    success,
    result,
    errors: errors ?? [],
  };
}
