/**
 *
 * @param success action의 성공 여부
 * @param result 성공한 경우의 반환값
 * @param formErrors form (단일 input) 에러 메시지 배열
 * @param fieldErrors field (다중 input) 에러 메시지 배열
 */
export function createActionResult<T = undefined>({
  success,
  result,
  formErrors,
  fieldErrors,
}: {
  success: boolean;
  result?: T;
  formErrors?: string[];
  fieldErrors?: { [key: string]: string[] | undefined };
}) {
  return {
    success,
    result,
    formErrors: formErrors ?? [],
    fieldErrors: fieldErrors ?? {},
  };
}

export const formDeafultValue = {
  success: false,
  result: undefined,
  formErrors: [],
  fieldErrors: {},
};
