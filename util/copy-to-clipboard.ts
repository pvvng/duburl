/** 클립보드에 텍스트 복사하는 함수 */
export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return { success: true };
  } catch (error) {
    console.error("클립보드 복사 실패:", error);
    return { success: false };
  }
};
