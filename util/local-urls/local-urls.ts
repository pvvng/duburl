import { LocalURLType } from "../types/short-key";
import { validateLocalURLs } from "./validate-local-key";

const LOCAL_KEYS_NAME = "duburl_key" as const;

/** localstorage에 저장된 이전 변환 값 불러오는 함수 */
export const getLocalURLs = () => {
  const localKeys = localStorage.getItem(LOCAL_KEYS_NAME);

  if (!localKeys) {
    setLocalURLs([]);
    return [];
  }

  return validateLocalURLs(localKeys);
};

/** localstorage에 변환값 저장하는 함수 */
export const setLocalURLs = (newKeys: LocalURLType[]) => {
  const validatedKeys = validateLocalURLs(JSON.stringify(newKeys));

  localStorage.setItem(LOCAL_KEYS_NAME, JSON.stringify(validatedKeys));
};
