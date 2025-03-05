export const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.target.select(); // 포커스 시 입력된 텍스트 전체 선택
};
