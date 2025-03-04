/** 제네릭 타입 정의를 위한 유틸리티 함수 */
export async function safeJson<T>(response: Response): Promise<T> {
  return response.json();
}
